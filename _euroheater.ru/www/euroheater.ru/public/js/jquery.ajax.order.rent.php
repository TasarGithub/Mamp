<?php # ����������: ���������� ������-������� "���������� ���������" �� ������� � ����������
# ���� ��������: 2018.01.10
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
if (empty($_POST['name']) || empty($_POST['phone'])) exit();

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
    # "������ �� ������ ���������:".PHP_EOL.
	"���: ".$_POST['name'].PHP_EOL.
	"������� ��� �����: ".$_POST['phone'].PHP_EOL.
	"������ ���������� �� ��������: ".$_POST['url'].PHP_EOL
	;

	/* $messageEn =
	PHP_EOL."***** Tekst-v-transliteracii *****:".PHP_EOL.
	"Zayavka na raschet stoimosti:".PHP_EOL.
    "Imya: ".$_POST['name_en'].PHP_EOL.
	"Telefon dlya svyazi: ".$_POST['phone_en'].PHP_EOL.
	"Zayavka otpravlena so stranici: ".$_POST['url'].PHP_EOL
	; */

	# echo '<pre>'.$message.'</pre>'; exit;

    # ������ �� ���� E-mail ��� online-������
    $emailForNotifications = getContent('/app/templates/email_for_notifications.html');
    if (empty($emailForNotifications)) $emailForNotifications = 'info@'.$_SERVER['SERVER_NAME'];
    
	if (mail($emailForNotifications,
	# if (mail("romanov.egor@gmail.com",
    DOMAIN_SHORT.' - ������ �� ������ ��������� ['.date('j '.getRusMonthName(date('m')).' Y G:i').']',
	$message.$messageEn,
	'From: www@'.DOMAIN_SHORT.PHP_EOL.
	#'Cc: vashpartner3@gmail.com'.PHP_EOL. # ������ �������� �������
    'MIME-Version: 1.0'.PHP_EOL. 
    'Content-type: text/plain; charset=Windows-1251'.PHP_EOL.
    'Content-Transfer-Encoding: quoted-printable'.PHP_EOL.
    'X-Mailer: PHP'
	)) {
		echo '
			<p>� ����� ��������� ����� � ���� �������� �������� ����� ��������.</p>
			<p>����������� �� �����! </p>
			<table class="table table-striped">
				<tr>
					<th colspan="2" class="em">&nbsp;���� ������</th>
				</tr>
				<tr>
					<td class="bold">���������� ���:</td>
					<td>'.$_POST['name'].'</td>
				</tr>
				<tr>
					<td class="bold">������� ��� �����:</td>
					<td>'.$_POST['phone'].'</td>
				</tr>
			</table>
            <p>���������� �� ��� ����� '.$_SERVER['SERVER_NAME'].'.</p>
		';
        
        # ��������� ����� ��� ������� ��� ����������
        # $orderForDB = $message.$messageEn;
        $orderForDB = $message;

		# ��������� ������ � �������
		saveRequestInDB();
	}
	else
	{
		echo '
		<div style="font-size:150%;text-align:center">
		� ���������, ������ ������� ��������� ����� ���� �������� �� ��������.
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
	insert into ".DB_PREFIX."online_requests
	(
	`request_type_id`,
	`date_add`,
    `order_content`,
    `http_x_real_ip`,
    `http_x_forwarded_for`,
    `http_user_agent`,
    `remove_addr`
	)
	values 
	(
	3,
    now(),
    :order_content,
    :http_x_real_ip,
    :http_x_forwarded_for,
    :http_user_agent,
    :remove_addr
	)
	"; # echo '<pre>'.$sql."</pre><hr />";
	$result = $dbh->prepare($sql);
	$result->bindParam(':order_content', $orderForDB);
	$result->bindParam(':http_x_real_ip', $_SERVER['HTTP_X_REAL_IP']);
	$result->bindParam(':http_x_forwarded_for', $_SERVER['HTTP_X_FORWARDED_FOR']);
	$result->bindParam(':http_user_agent', $_SERVER['HTTP_USER_AGENT']);
	$result->bindParam(':remove_addr', $_SERVER['REMOTE_ADDR']);
	try
	{
		if ($result->execute())
		{
			$last_insert_id = $dbh->lastInsertId(); # echo $last_insert_id.'<hr />';
			
			if (!empty($last_insert_id))
			{
				return $last_insert_id;
			}
			else return;
		}
	}
	catch (PDOException $e) { if (DB_SHOW_ERRORS) { echo "������ � SQL-�������:<br /><br />".$sql."<br /><br />".$e->getMessage(); } }
}
# /��������� ������ � ��

# �������� � ������ POST-����������
function preparePOSTVariables()
{
	foreach ($_POST as $key => &$val)
	{
		if (!empty($val))
		{
			if (!is_array($key) and !is_array($val))
			{
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
	if (!empty($var))
	{
		$isUTF8 = detectUTF8($var); # echo $isUTF8.'<hr />';
		# ���� ��� UTF-8
		if (!empty($isUTF8))
		{
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