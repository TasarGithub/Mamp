<?php

$mail->CharSet = "UTF-8";

if ($_POST['userEmailSubscribe']<>''){
    // $userName = $_POST['userName'];
    $userEmailSubscribe = $_POST['userEmailSubscribe'];
		// $userPhone = $_POST['userPhone'];
		//Формирование письма
		$title = "New e-mail for subscribe";
		$body = "
		<h2> New e-mail</h2>
		<b>Почта:</b> $userEmailSubscribe<br>
		<b></b> <br>
		<b></b> <br>
		";
}



if ($_POST['formComments']<>''){
	$formComments = $_POST['formComments'];

 // echo $userName;
	//Формирование письма
	$title = "formComments";
	$body = "
	<h2> New comment </h2>

	<b> Message:</b><br> $formComments";

}

// $userName = $_POST['userNameFooter'];

// echo $_POST['userNameFooter'];  //$_POST['userNameFooter'];
// // echo "userNameMetering", $_POST['userNameMetering'];
// // echo $_POST['userNameControl'];
// // echo $_POST['userNameFuter'];
echo $body;
echo $title;


// Load Composer's autoloader
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Instantiation and passing `true` enables exceptions

$mail = new PHPMailer();


try {

		$mail->isSMTP();
		$mail->CharSet = "UTF-8";
		$mail->SMTPAuth   = true;
		// $mail->SMTPDebug = 2;
		// $mail->Debugoutput = function($str, $level) {GLOBALS['status'][]= $str;};

		// Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com';
    $mail->Username   = 'vshtrs@gmail.com';
    $mail->Password   = '$rfv%tgb^yhn';
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;

    //Recipients
    $mail->setFrom('vshtrs@gmail.com', 'Тарас отправитель');
		$mail->addAddress('tasar-ya@yandex.ru', 'Тарас получатель');
		// $mail->addAddress('tasar-ya@yandex.ru', 'Тарас получатель');


    // Content
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;
		//${userName} ${userNameFooter} ${userNameFoursteps} ${userNameControl}
		
    if ($mail->send()) { $result = "success";
			// echo "ok nnnnnnnn";
			// echo $body;
			// echo $title;
			header('Location: thanks.html');
		} else { $result = "error";
			echo $body;
        echo "Не отправлено. Код ошибки: {$mail->ErrorInfo}";
		}


} catch (Exception $e) {
    echo "Письмо не отправлено. Код ошибки: {$mail->ErrorInfo}";
}

// Отображение результата

// echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);
	//header('Location: thankyou.html');

?>