<?php # ����������: ���������� ������-������� ������ � �������� � ������� � ����������
# ���� ��������: 2015.10.9
# �����: romanov.egor@gmail.com

# ������������
# sleep(3); echo '<pre>'.(print_r($_POST, true)).'</pre>'; exit('exit');

# ������ �� ������� c ������� �����
if (!stristr($_SERVER['HTTP_REFERER'], $_SERVER['SERVER_NAME'])) exit('');

# ��������� ���������, ������� ����� �������� javascript'� ajax-������
header('Content-type: text/html; charset=windows-1251');

# ��������, ������ + ������ ��������� GET-����������
preparePOSTVariables(); # print_r($_POST); exit;

# ���������� � �������������� ����� ��� ������ � �� ����� PDO
include($_SERVER['DOCUMENT_ROOT'].'/app/db.connection.pdo.php');

# echo '<pre>'.(print_r($_POST, true)).'</pre>';

# ��������� ����������
if (empty($_POST['id'])) return;

if (empty($_SERVER['REMOTE_ADDR'])) return;

if (empty($_POST['action'])) return;

if ($_POST['action'] != 'plus' && $_POST['action'] != 'minus') return;
# /��������� ����������

$result = checkIP(); # echo 'result: '.$result;

if (!empty($result))
{
	$array['result'] = 'already_voted';
	/*
	$votes = getVotes(); # print_r($votes);
	$array['votes_plus'] = $votes['votes_plus'];
	$array['votes_minus'] = $votes['votes_minus'];
	*/
}
else
{
	setVote();
	setIP();
	$votes = getVotes(); # print_r($votes);
	$array['result'] = 'success';
	$array['id'] = $_POST['id'];
	$array['votes_plus'] = $votes['votes_plus'];
	$array['votes_minus'] = $votes['votes_minus'];
}

echo json_encode($array);

# �������

# ���������, ��������� �� ������ IP �� ������� ������
function checkIP()
{
	# print_R($_POST);
	
	global $dbh;
	
	$sql = "
	select id
	from ".DB_PREFIX."feedback_votes_ips
	where ip = :ip
		  and feedback_id = :feedback_id
	limit 1
	"; # echo $sql."<hr />";
	$result = $dbh->prepare($sql);
	$result->bindParam(':ip', $_SERVER['REMOTE_ADDR']);
	$result->bindParam(':feedback_id', $_POST['id'], PDO::PARAM_INT);
	try {
		if ($result->execute()) {
			$_ = $result->fetch(); # print_r($_);
			if (!empty($_['id'])) return 1;
			else return;
		}
	}
	catch (PDOException $e) { if (DB_SHOW_ERRORS) { echo "������ � SQL-�������:<br /><br />".$sql."<br /><br />".$e->getMessage(); } }
}
# /���������, ��������� �� ������ IP �� ������� ������

# ��������� ����� � ��
function setVote()
{
	global $dbh;
	
	if ($_POST['action'] == 'plus') {
		$sql = "
		update ".DB_PREFIX."feedback
		set votes_plus = 1 + votes_plus
		where id = :id
		"; # echo $sql."<hr />";
	}
	elseif ($_POST['action'] == 'minus') {
		$sql = "
		update ".DB_PREFIX."feedback
		set votes_minus = votes_minus + 1
		where id = :id
		"; # echo $sql."<hr />";
	}
	$result = $dbh->prepare($sql);
	$result->bindParam(':id', $_POST['id'], PDO::PARAM_INT);
	try {
		if ($result->execute())	{ return 1;	}
	}
	catch (PDOException $e) { if (DB_SHOW_ERRORS) { echo "������ � SQL-�������:<br /><br />".$sql."<br /><br />".$e->getMessage(); } }
}
# /��������� ����� � ��

# ��������� IP � ��
function setIP()
{
	global $dbh;
	
	$sql = "
	insert into ".DB_PREFIX."feedback_votes_ips
	(
	feedback_id,
	ip
	)
	values
	(
	:feedback_id,
	:ip
	)
	"; # echo $sql."<hr />";
	$result = $dbh->prepare($sql);
	$result->bindParam(':feedback_id', $_POST['id'], PDO::PARAM_INT);
	$result->bindParam(':ip', $_SERVER['REMOTE_ADDR'], PDO::PARAM_STR);
	try	{
		if ($result->execute()) { return 1;	}
	}
	catch (PDOException $e) { if (DB_SHOW_ERRORS) { echo "������ � SQL-�������:<br /><br />".$sql."<br /><br />".$e->getMessage(); } }
}
# /��������� ����� � ��

# �������� ������ �������
function getVotes()
{
	global $dbh;
	
	$sql = "
	select votes_plus,
		   votes_minus
	from ".DB_PREFIX."feedback
	where id = :id
	"; # echo $sql."<hr />";
	$result = $dbh->prepare($sql);
	$result->bindParam(':id', $_POST['id'], PDO::PARAM_INT); # echo $eventID.'<hr />';
	try	{
		if ($result->execute())	{
			$_ = $result->fetch(); # print_r($_);
			return $_;
		}
	}
	catch (PDOException $e) { if (DB_SHOW_ERRORS) { echo "������ � SQL-�������:<br /><br />".$sql."<br /><br />".$e->getMessage(); } }
} # /�������� ������ �������

# �������� � ������ GET-����������
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
}
# /�������� � ������ GET-����������

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
}
# /�������� ������ ��������� ������

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
}
# /����������, �������� �� ��������� ������ UTF-8 ��� ���

# /�������