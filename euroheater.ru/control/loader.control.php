<?php

# ������ ������
# session_start();

# echo '<pre>'.(print_r($_SESSION, true)).'</pre>';

# echo '<!-- '.$_SERVER['REQUEST_URI'].' -->';

# unset($_SESSION['auth']);

### �������
# print_r($_GET);
# print_r($_POST);
# print_r($_FILES);
# echo '<pre>'.(print_r($_COOKIE, true)).'</pre>';

# ������
include('config.control.php');

# ����� ������������ �� ���� php
$tpl = new templates();

# ����� ������ ���������������� ������
$defence = new defence;

# ��������� mysql � ������������� ����������: http://ru2.php.net/manual/en/book.pdo.php
include('db.connection.pdo.php');

# ���������� ������� ������� ���������� ��� ajax-��������
include('functions.common.ajax.php');

# ������� ������� ������
if ($_SERVER['REQUEST_URI'] == '/control/')
{
    header('Location: /control/online_requests/');
    # header('Location: /control/online_requests/');
}

# �������� ������� "�� ����"
function __autoload($class_name)
{
	$filename = strtolower($class_name); # echo "filename: ".$filename."<hr />";
	# �� ��-MVC �������
	$file = DOCUMENT_ROOT.'/control/#library/'.$filename.'.php';
	
    /* # �������
	echo 'file: '.$file.' exists: '.file_exists($file).'<br />';
	# */
   
	if (file_exists($file)) include($file);
	else return;
} # /�������� ������� "�� ����"
