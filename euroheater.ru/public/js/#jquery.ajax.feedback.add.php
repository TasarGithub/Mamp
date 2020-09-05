<?php # ����������: ���������� ������-������� "�������� �����" � ����������
# ���� ��������: 2015.10.11
# �����: romanov.egor@gmail.com

# ������������
# sleep(7); exit();

# ������ �� ������� c ������� �����
if (!stristr($_SERVER['HTTP_REFERER'], $_SERVER['SERVER_NAME'])) exit('');

# ��������� ���������, ������� ����� �������� javascript'� ajax-������
header('Content-type: text/html; charset=windows-1251');

# ��������, ������ + ������ ��������� GET-����������
preparePOSTVariables(); # print_r($_POST); exit;

# �������� ������������ ����������
if (empty($_POST['name']) || empty($_POST['activity']) || empty($_POST['text'])) exit();

# ���������� ������
include($_SERVER['DOCUMENT_ROOT'].'/app/config.php');

# ���������� � �������������� ����� ��� ������ � �� ����� PDO
include($_SERVER['DOCUMENT_ROOT'].'/app/db.connection.pdo.php');

# ���������� ���� � ���������
include($_SERVER['DOCUMENT_ROOT'].'/app/library/functions.php');

sendLetterToManager();

# echo '<pre>'.(print_r($_POST, true)).'</pre>';

# �������

# ���������� ����� ���������
function sendLetterToManager()
{
	# print_R($_POST);
    
    global $orderForDB;

	$message =
    "����� � �����:".PHP_EOL.
	"���: ".$_POST['name'].PHP_EOL.
	"����� ������������: ".$_POST['activity'].PHP_EOL.
	"�����: ".$_POST['text'].PHP_EOL.
	"����� ��������� �� ��������: ".$_POST['url'].PHP_EOL
	;
    
	$messageEn =
	PHP_EOL."***** Tekst-v-transliteracii *****:".PHP_EOL.
	"Otziv s saita:".PHP_EOL.
    "Imya: ".$_POST['name_en'].PHP_EOL.
	"Sfera deyatelnosti: ".$_POST['activity_en'].PHP_EOL.
	"Otziv: ".$_POST['text_en'].PHP_EOL.
	"Otziv otpravlen so stranici: ".$_POST['url'].PHP_EOL
	;

	# echo '<pre>'.$message.'</pre>'; exit;

    # ������ �� ���� E-mail ��� online-������
    $emailForNotifications = getContent('/app/templates/email_for_notifications.html');
    if (empty($emailForNotifications)) $emailForNotifications = 'info@'.$_SERVER['SERVER_NAME'];

    if (mail($emailForNotifications,
	# if (mail("romanov.egor@gmail.com",
    DOMAIN_SHORT.' - ����� � ����� ['.date('j '.getRusMonthName(date('m')).' Y G:i').']',
	$message.$messageEn,
	"From: www@".DOMAIN_SHORT.PHP_EOL.
	# "Cc: ".PHP_EOL.
    'MIME-Version: 1.0'.PHP_EOL. 
    'Content-type: text/plain; charset=Windows-1251'.PHP_EOL.
    'Content-Transfer-Encoding: quoted-printable'.PHP_EOL.
    'X-Mailer: PHP'
	)) {
		echo '
			<div class="hilight">
			<p class="bold">��� �����:</p>
			<p>'.$_POST['text'].'</p>
			</div>
			<table class="table table-striped table-price">
				<tr>
					<th colspan="2" class="em">&nbsp;���� ������</th>
				</tr>
				<tr>
					<td class="bold">���������� ���:</td>
					<td>'.$_POST['name'].'</td>
				</tr>
				<tr>
					<td class="bold">����� ������������:</td>
					<td>'.$_POST['activity'].'</td>
				</tr>
			</table>
			<p>���������� �� ��������!</p>
		';
        
        # ��������� ����� ��� ������� ��� ����������
        $orderForDB = $message.$messageEn;
		
		# ��������� ������ � �������
		saveRequestInDB();
	}
	else {
		echo '
		<div style="font-size:150%;text-align:center">
		� ���������, �������� ������� ����� ���� �������� �� ��������.
		<br /><br />
		����������, ��������� � ���� �� ��������.
		<br /><br />
		���������� �� ��� ����� '.$_SERVER['SERVER_NAME'].'.
		</div>
		';
	}
}
# /���������� ����� ���������

# ��������� ������ � ��
function saveRequestInDB()
{
	global $dbh, $orderForDB;
	
	$sql = "
	insert into ".DB_PREFIX."feedback
	(
	`name`,
	`activity`,
    `feedback`,
    `votes_plus`,
    `votes_minus`,
    `date_add`,
    `is_published`
	)
	values 
	(
    :name,
    :activity,
    :feedback,
    0,
    0,
    now(),
    NULL
	)
	"; # echo '<pre>'.$sql."</pre><hr />";
	$result = $dbh->prepare($sql);
	$result->bindParam(':name', $_POST['name']);
	$result->bindParam(':activity', $_POST['activity']);
	$result->bindParam(':feedback', $_POST['text']);
	try {
		if ($result->execute())	{
			$last_insert_id = $dbh->lastInsertId(); # echo $last_insert_id.'<hr />';
			
			if (!empty($last_insert_id)) return $last_insert_id;
			else return;
		}
	}
	catch (PDOException $e) { if (DB_SHOW_ERRORS) { echo "������ � SQL-�������:<br /><br />".$sql."<br /><br />".$e->getMessage(); } }
}
# /��������� ������ � ��

# �������� � ������ POST-����������
function preparePOSTVariables()
{
	foreach ($_POST as $key => &$val) {
		if (!empty($val)) {
			if (!is_array($key) and !is_array($val)) {
				$_POST[$key] = trim($val);
				$_POST[$key] = filter_input(INPUT_POST, $key, FILTER_SANITIZE_SPECIAL_CHARS);
                $_POST[$key] = strip_tags($val);
				$_POST[$key] = getCorrectEnc($val);
                # ���� ���� � ������� �������� ������ �� &#10;
                $_POST[$key] = str_replace(array(PHP_EOL, '&#10;'), ' ', $val);
			}
		}
	}
} # /�������� � ������ POST-����������

# �������� ������ ��������� ������
function getCorrectEnc($var)
{
	# ��������� �������� ����������
	if (empty($var)) return;
	
	# echo $var.'<hr />';
	if (!empty($var)) {
		$isUTF8 = detectUTF8($var); # echo $isUTF8.'<hr />';
		# ���� ��� UTF-8
		if (!empty($isUTF8)) {
			$var = iconv('UTF-8', 'windows-1251//TRANSLIT', $var); # echo $var."<br />"
		}
		
		return $var;		
	}
	# /�������� ������ ��������� ��� ������
	# echo $var.'<hr />';
} # /�������� ������ ��������� ������

# ����������, �������� �� ��������� ������ UTF-8 ��� ���
# ���������� 1 - ���� UTF-8, 0 - ���� �� UTF-8
function detectUTF8($string)
{
    return preg_match('%(?:
        [\xC2-\xDF][\x80-\xBF]             # non-overlong 2-byte
        |\xE0[\xA0-\xBF][\x80-\xBF]        # excluding overlongs
        |[\xE1-\xEC\xEE\xEF][\x80-\xBF]{2} # straight 3-byte
        |\xED[\x80-\x9F][\x80-\xBF]        # excluding surrogates
        |\xF0[\x90-\xBF][\x80-\xBF]{2}     # planes 1-3
        |[\xF1-\xF3][\x80-\xBF]{3}         # planes 4-15
        |\xF4[\x80-\x8F][\x80-\xBF]{2}     # plane 16
        )+%xs', 
    $string);
} # /����������, �������� �� ��������� ������ UTF-8 ��� ���

# /�������