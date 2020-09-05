<?php

// $mail->CharSet = "UTF-8";

if ($_POST['userName']<>''){
    $userName = $_POST['userName'];
    $userEmail = $_POST['userEmail'];
    $userPhone = $_POST['userPhone'];
}
if ($_POST['userNameMetering']<>''){
    $userName = $_POST['userNameMetering'];
    $userEmail = $_POST['userEmailMetering'];
    $userPhone = $_POST['userPhoneMetering'];
    //echo "userNameMetering", $userName;
} 
if ($_POST['userNameControl']<>''){
    $userName = $_POST['userNameControl'];
    $userEmail = $_POST['userEmailControl'];
    $userPhone = $_POST['userPhoneControl'];
   // echo "userNameControl", $userName;
} 
if ($_POST['userNameFooter']<>''){
    $userName = $_POST['userNameFooter'];
    $userPhone = $_POST['userPhoneFooter'];
   // echo $userName;
}

// echo "userName", $_POST['userName'];
// echo "userNameMetering", $_POST['userNameMetering'];
// echo $_POST['userNameControl'];
// echo $_POST['userNameFuter'];


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
    //Server settings
    $mail->SMTPDebug = 2;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'vshtrs@gmail.com';                     // SMTP username
    $mail->Password   = '$rfv%tgb^yhn';                               // SMTP password
    $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('vshtrs@gmail.com', 'Тарас отправитель');
    $mail->addAddress('tasar-ya@yandex.ru', 'Тарас получатель');     // Add a recipient


    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Новая заявка с сайта';
    $mail->Body    = "Имя пользователя: ${userName}, его телефон: ${userPhone}. Его почта: ${userEmail}";
    //${userName} ${userNameFooter} ${userNameFoursteps} ${userNameControl}
    if ($mail->send()) {
      echo "ok nnnnnnnn";
    } else {
        echo "Не отправлено. Код ошибки: {$mail->ErrorInfo}";
     }

    //  $mail->send();
    //  header('Location: thanks.html');
} catch (Exception $e) {
    echo "Письмо не отправлено. Код ошибки: {$mail->ErrorInfo}";
}
