<?php
include ("config.php");
$ret = "";
if (isset($_POST['userfrom']) && isset($_POST['emailfrom']) && isset($_POST['message'])) {
	$userfrom = htmlspecialchars(trim($_POST['userfrom']));
	$emailfrom = htmlspecialchars(trim($_POST['emailfrom']));
	$message = htmlspecialchars(trim($_POST['message']));	
	$messsage = "--- Вам пришло сообщение с Вашего сайта ---\n\n".
				"Пользователь $userfrom($emailfrom) пишет:\n".
				"$message \n\n".
				"-------------------------------------------";
	$sendmail = mail (TO_EMAIL,"Сообщение с сайта - ".SITE_NAME,$messsage,"Content-type:text/plain; charset = utf-8\r\nFrom:$emailfrom");
	if (!$sendmail){
		$ret = "Сообщение отправить не удалось<br>Ошибка сервера";
	}
} else {
	$ret = "Данные введены не полность или не корректно";
}
echo $ret;

?>