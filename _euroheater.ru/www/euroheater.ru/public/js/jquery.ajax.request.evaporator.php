<?php # ����������: ���������� ������-������� "������ � ������ ����������"
# https://euroheater.ru/raschet-isparitelya/
# ���� ��������: 24 ������� 2018
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
    # '������ �� ������ � ������ ����������:'.PHP_EOL.
    (!empty($_POST['sizesFTA']) ? 'FTA, ��: '.$_POST['sizesFTA'].PHP_EOL : '').
    (!empty($_POST['sizesFTB']) ? 'FTB, ��: '.$_POST['sizesFTB'].PHP_EOL : '').
    (!empty($_POST['sizesA']) ? 'A, ��: '.$_POST['sizesA'].PHP_EOL : '').
    (!empty($_POST['sizesB']) ? 'B, ��: '.$_POST['sizesB'].PHP_EOL : '').
    (!empty($_POST['sizesS']) ? 'S, ��: '.$_POST['sizesS'].PHP_EOL : '').
    (!empty($_POST['sizesDiameterE']) ? '������� E: '.$_POST['sizesDiameterE'].PHP_EOL : '').
    (!empty($_POST['sizesDiameterU']) ? '������� U: '.$_POST['sizesDiameterU'].PHP_EOL : '').
    (!empty($_POST['sizesLane']) ? '��������: '.$_POST['sizesLane'].PHP_EOL : '').
    (!empty($_POST['sizesLamellaStep']) ? '��� ������, ��: '.$_POST['sizesLamellaStep'].PHP_EOL : '').
    (!empty($_POST['tray']) ? '������ � ��������������, ��: '.$_POST['tray'].PHP_EOL : '').
    (!empty($_POST['tubeMaterial']) ? '�������� ������: '.$_POST['tubeMaterial'].PHP_EOL : '').
    (!empty($_POST['lamellaMaterial']) ? '�������� �������: '.$_POST['lamellaMaterial'].PHP_EOL : '').
    (!empty($_POST['airSpending']) ? '������ �������: '.$_POST['airSpending'].PHP_EOL : '').
    (!empty($_POST['airHumidity']) ? '��������� �������, %: '.$_POST['airHumidity'].PHP_EOL : '').
    (!empty($_POST['inputAirTemperature']) ? '����������� ������� �� �����: '.$_POST['inputAirTemperature'].PHP_EOL : '').
    (!empty($_POST['outputAirTemperature']) ? '����������� ������� �� ������: '.$_POST['outputAirTemperature'].PHP_EOL : '').
    (!empty($_POST['freonType']) ? '��� ������: '.$_POST['freonType'].PHP_EOL : '').
    (!empty($_POST['freonEvaporationTemperature']) ? '����������� ��������� ������, �C: '.$_POST['freonEvaporationTemperature'].PHP_EOL : '').
    (!empty($_POST['power']) ? '��������: '.$_POST['power'].PHP_EOL : '').
    (!empty($_POST['notes']) ? '�������������� ����������: '.$_POST['notes'].PHP_EOL : '').
    '���: '.$_POST['name'].PHP_EOL.
    (!empty($_POST['company']) ? '��������: '.$_POST['company'].PHP_EOL : '').
    (!empty($_POST['city']) ? '�����: '.$_POST['city'].PHP_EOL : '').
    'E-mail: '.$_POST['email'].PHP_EOL.
    '�������: '.$_POST['phone'].PHP_EOL.
	'������ ���������� �� ��������: '.$_POST['url'].PHP_EOL
	;
    
	/* $messageEn =
	PHP_EOL.'***** Tekst-v-transliteracii *****:'.PHP_EOL.
	'Zayavka na raschet i podbor isparitela: '.PHP_EOL.
    (!empty($_POST['heatExchangerTypeEn']) ? 'Tip teploobmennika: '.$_POST['heatExchangerTypeEn'].PHP_EOL : '').

    (!empty($_POST['sizesFTAEn']) ? 'Dannie po razmeram. FTA, mm: '.$_POST['sizesFTAEn'].PHP_EOL : '').
    (!empty($_POST['sizesFTBEn']) ? 'Dannie po razmeram. FTB, mm: '.$_POST['sizesFTBEn'].PHP_EOL : '').
    (!empty($_POST['sizesAEn']) ? 'Dannie po razmeram. A, mm: '.$_POST['sizesAEn'].PHP_EOL : '').
    (!empty($_POST['sizesBEn']) ? 'Dannie po razmeram. B, mm: '.$_POST['sizesBEn'].PHP_EOL : '').
    (!empty($_POST['sizesSEn']) ? 'Dannie po razmeram. S, mm: '.$_POST['sizesSEn'].PHP_EOL : '').
    (!empty($_POST['sizesDiameterEEn']) ? 'Dannie po razmeram. Diametr E: '.$_POST['sizesDiameterEEn'].PHP_EOL : '').
    (!empty($_POST['sizesDiameterUEn']) ? 'Dannie po razmeram. Diametr U: '.$_POST['sizesDiameterUEn'].PHP_EOL : '').
    (!empty($_POST['sizesLaneEn']) ? 'Dannie po razmeram. Radnost: '.$_POST['sizesLaneEn'].PHP_EOL : '').
    (!empty($_POST['sizesLamellaStepEn']) ? 'Dannie po razmeram. Shag lameli, ��: '.$_POST['sizesLamellaStepEn'].PHP_EOL : '').
    (!empty($_POST['trayEn']) ? 'Dannie po razmeram. Poddon i kapleulovitel, mm: '.$_POST['trayEn'].PHP_EOL : '').

    (!empty($_POST['tubeMaterialEn']) ? 'Materiali. Mterial trubki: '.$_POST['tubeMaterialEn'].PHP_EOL : '').
    (!empty($_POST['lamellaMaterialEn']) ? 'Materiali. Material lamelei: '.$_POST['lamellaMaterialEn'].PHP_EOL : '').

    (!empty($_POST['airSpendingEn']) ? 'Tehnicheskoe zadanie. Rashod vozduha: '.$_POST['airSpendingEn'].PHP_EOL : '').
    (!empty($_POST['airHumidity']) ? 'Tehnicheskoe zadanie. Vlajnost vozduha, %: '.$_POST['airHumidityEn'].PHP_EOL : '').
    (!empty($_POST['inputAirTemperatureEn']) ? 'Tehnicheskoe zadanie. Temperatura vozduha na vhode: '.$_POST['inputAirTemperatureEn'].PHP_EOL : '').
    (!empty($_POST['outputAirTemperatureEn']) ? 'Tehnicheskoe zadanie. Temperatura vozduha na vihode: '.$_POST['outputAirTemperatureEn'].PHP_EOL : '').
    (!empty($_POST['freonType']) ? 'Tehnicheskoe zadanie. Tip freona: '.$_POST['freonType'].PHP_EOL : '').
    (!empty($_POST['freonEvaporationTemperatureEn']) ? 'Tehnicheskoe zadanie. Temperatura isparenia freona, �C: '.$_POST['freonEvaporationTemperatureEn'].PHP_EOL : '').
    (!empty($_POST['powerEn']) ? 'Tehnicheskoe zadanie. Moshnost: '.$_POST['powerEn'].PHP_EOL : '').
    (!empty($_POST['notesEn']) ? 'Tehnicheskoe zadanie. Dopolnitelnaa informacia: '.$_POST['notesEn'].PHP_EOL : '').
    'FIO: '.$_POST['nameEn'].PHP_EOL.
    (!empty($_POST['companyEn']) ? 'Kompania: '.$_POST['companyEn'].PHP_EOL : '').
    (!empty($_POST['cityEn']) ? 'Gorod: '.$_POST['cityEn'].PHP_EOL : '').
    'E-mail: '.$_POST['emailEn'].PHP_EOL.
    'Telefon: '.$_POST['phoneEn'].PHP_EOL.
	'Zayavka otpravlena so stranici: '.$_POST['url'].PHP_EOL
	; */

	# echo '<pre>'.$message.'</pre>'; exit;

    # ������ �� ���� E-mail ��� online-������
    $emailForNotifications = getContent('/app/templates/email_for_notifications.html');
    if (empty($emailForNotifications)) $emailForNotifications = 'info@'.$_SERVER['SERVER_NAME'];
    
	if (mail($emailForNotifications,
	# if (mail("romanov.egor@gmail.com",
    str_replace('www.', '', $_SERVER['SERVER_NAME']).' - ������ �� ������ � ������ ���������� ['.date("j.n.Y G:i").']',
	# $message.$messageEn,
	$message,
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
        # $orderForDB = $message.$messageEn;
        $orderForDB = $message;

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
	11,
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
                $_POST[$key] = str_replace('&#34;', '"', $val);
                $_POST[$key] = str_replace('&#39;', "'", $val);
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