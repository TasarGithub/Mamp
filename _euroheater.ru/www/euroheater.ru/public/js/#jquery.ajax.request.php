<?php # ����������: ���������� ������-������� "������ �� �������������"
# https://euroheater.ru/calculator/
# ���� ��������: 20 ������ 2018
# �����: romanov.egor@gmail.com

# ������������
# sleep(5); exit();

# ������ �� ������� c ������� �����
if (!stristr($_SERVER['HTTP_REFERER'], $_SERVER['SERVER_NAME'])) exit('');

# ��������� ���������, ������� ����� �������� javascript'� ajax-������
header('Content-type: text/html; charset=windows-1251');

# ��������, ������ + ������ ��������� GET-����������
preparePOSTVariables(); # print_r($_POST); exit;

# �������� ������������ ����������
if (empty($_POST['name']) || empty($_POST['phone'])) exit();

# ���������� � �������������� ����� ��� ������ � �� ����� PDO
include($_SERVER['DOCUMENT_ROOT'].'/app/db.connection.pdo.php');

# ���������� ���� � ���������
include($_SERVER['DOCUMENT_ROOT'].'/app/library/functions.php');

sendLetterToManager();

# echo '<pre>'.(print_r($_POST, true)).'</pre>';
# exit;

# *************************************************************************************************

# �������

# *************************************************************************************************

# ���������� ����� ���������
function sendLetterToManager()
{
	# print_R($_POST);
    
    global $orderForDB;

	$message =
    '������ �� �������������:'.PHP_EOL.
    (!empty($_POST['heatExchangerType']) ? '��� ��������������: '.$_POST['heatExchangerType'].PHP_EOL : '').
    (!empty($_POST['airSpanding']) ? '������ �������: '.$_POST['airSpanding'].PHP_EOL : '').
    (!empty($_POST['coolantSpanding']) ? '������ �������������: '.$_POST['coolantSpanding'].PHP_EOL : '').
    (!empty($_POST['inputAirTemperature']) ? '����������� ������� �� �����: '.$_POST['inputAirTemperature'].PHP_EOL : '').
    (!empty($_POST['outputAirTemperature']) ? '����������� ������� �� ������: '.$_POST['outputAirTemperature'].PHP_EOL : '').
    (!empty($_POST['inputCoolantTemperature']) ? '����������� ������������� �� �����: '.$_POST['inputCoolantTemperature'].PHP_EOL : '').
    (!empty($_POST['outputCoolantTemperature']) ? '����������� ������������� �� ������: '.$_POST['outputCoolantTemperature'].PHP_EOL : '').
    (!empty($_POST['power']) ? '��������� ��������: '.$_POST['power'].PHP_EOL : '').
    (!empty($_POST['ftaLength']) ? '����� FTA: '.$_POST['ftaLength'].PHP_EOL : '').
    (!empty($_POST['ftbHength']) ? '������ FTB: '.$_POST['ftbHength'].PHP_EOL : '').
    (!empty($_POST['sWidth']) ? '������ S: '.$_POST['sWidth'].PHP_EOL : '').
    (!empty($_POST['inputCdiameter']) ? '������� ���������� ��������� �� ����� C: '.$_POST['inputCdiameter'].PHP_EOL : '').
    (!empty($_POST['outputCdiameter']) ? '������� ���������� ��������� �� ������ C: '.$_POST['outputCdiameter'].PHP_EOL : '').
    '���� ������������� (�������): '.($_POST['unit'] == 'true' ? '��' : '���').PHP_EOL.
    '���: '.$_POST['name'].PHP_EOL.
    (!empty($_POST['company']) ? '��������: '.$_POST['company'].PHP_EOL : '').
    (!empty($_POST['city']) ? '�����: '.$_POST['city'].PHP_EOL : '').
    'E-mail: '.$_POST['email'].PHP_EOL.
    '�������: '.$_POST['phone'].PHP_EOL.
    (!empty($_POST['notes']) ? '����������: '.$_POST['notes'].PHP_EOL : '').
	'������ ���������� �� ��������: '.$_POST['url'].PHP_EOL
	;
    
	$messageEn =
	PHP_EOL.'***** Tekst-v-transliteracii *****:'.PHP_EOL.
	'Zayavka na teploobmennik: '.PHP_EOL.
    (!empty($_POST['heatExchangerTypeEn']) ? 'Tip teploobmennika: '.$_POST['heatExchangerTypeEn'].PHP_EOL : '').
    (!empty($_POST['airSpandingEn']) ? 'Rashod vozduha: '.$_POST['airSpandingEn'].PHP_EOL : '').
    (!empty($_POST['coolantSpandingEn']) ? 'Rashod teplonositela: '.$_POST['coolantSpandingEn'].PHP_EOL : '').
    (!empty($_POST['inputAirTemperatureEn']) ? 'Temperatura vozduha na vhode: '.$_POST['inputAirTemperatureEn'].PHP_EOL : '').
    (!empty($_POST['outputAirTemperatureEn']) ? 'Temperatura vozduha na vihode: '.$_POST['outputAirTemperatureEn'].PHP_EOL : '').
    (!empty($_POST['inputCoolantTemperatureEn']) ? 'Temperature teplonositela na vhode: '.$_POST['inputCoolantTemperatureEn'].PHP_EOL : '').
    (!empty($_POST['outputCoolantTemperatureEn']) ? 'Temperature teplonositela na vihode: '.$_POST['outputCoolantTemperatureEn'].PHP_EOL : '').
    (!empty($_POST['powerEn']) ? 'Trebuemaa moshnost: '.$_POST['powerEn'].PHP_EOL : '').
    (!empty($_POST['ftaLengthEn']) ? 'Dlina FTA: '.$_POST['ftaLengthEn'].PHP_EOL : '').
    (!empty($_POST['ftbHengthEn']) ? 'Visota FTB: '.$_POST['ftbHengthEn'].PHP_EOL : '').
    (!empty($_POST['sWidthEn']) ? 'Shirina S: '.$_POST['sWidthEn'].PHP_EOL : '').
    (!empty($_POST['inputCdiameterEn']) ? 'Diameter podvodyashih patrubkov na vhode: '.$_POST['inputCdiameterEn'].PHP_EOL : '').
    (!empty($_POST['outputCdiameterEn']) ? 'Diameter podvodyashih patrubkov na vihode: '.$_POST['outputCdiameterEn'].PHP_EOL : '').
    'Uzel regulirovania (tipovoi): '.($_POST['unitEn'] == 'true' ? 'da' : 'net').PHP_EOL.
    'FIO: '.$_POST['nameEn'].PHP_EOL.
    (!empty($_POST['companyEn']) ? 'Kompania: '.$_POST['companyEn'].PHP_EOL : '').
    (!empty($_POST['cityEn']) ? 'Gorod: '.$_POST['cityEn'].PHP_EOL : '').
    'E-mail: '.$_POST['emailEn'].PHP_EOL.
    'Telefon: '.$_POST['phoneEn'].PHP_EOL.
    (!empty($_POST['notesEn']) ? 'Primechania: '.$_POST['notesEn'].PHP_EOL : '').
	'Zayavka otpravlena so stranici: '.$_POST['url'].PHP_EOL
	;

	# echo '<pre>'.$message.'</pre>'; exit;

    # ������ �� ���� E-mail ��� online-������
    $emailForNotifications = getContent('/app/templates/email_for_notifications.html');
    if (empty($emailForNotifications)) $emailForNotifications = 'info@'.$_SERVER['SERVER_NAME'];
    
	if (mail($emailForNotifications,
	# if (mail("romanov.egor@gmail.com",
    str_replace('www.', '', $_SERVER['SERVER_NAME']).' - ������ �� ������������� ['.date("j.n.Y G:i").']',
	$message.$messageEn,
	'From: www@'.str_replace('www.', '', $_SERVER['SERVER_NAME']).PHP_EOL.
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
        $orderForDB = $message.$messageEn;
		
		# ��������� ������ � �������
		saveRequestInDB();
	}
	else
	{
		echo '
		<div style="font-size:150%;text-align:center">
		� ���������, ������ ������ ��������� ������ ����� ���� �������� �� ��������.
		<br /><br />
		����������, ��������� � ���� �� ��������.
		<br /><br />
		���������� �� ��� ����� '.$_SERVER['SERVER_NAME'].'.
		</div>
		';
	}
} # /���������� ����� ���������

# *************************************************************************************************

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
	6,
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
} # /��������� ������ � ��

# *************************************************************************************************

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
			}
		}
	}
} # /�������� � ������ POST-����������

# *************************************************************************************************

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

# *************************************************************************************************

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

# *************************************************************************************************

# /�������

# *************************************************************************************************