<?

// Mail for Mercury.
// This finally takes care of sending mails, well, from Mail.// Declarate the necessary variables

$mailtext = $_POST['elm1'];

$body = stripslashes($mailtext);
$to = $_POST['recipient'];$subject = $_POST['subject_line'];
$from = $_POST['from'];
$headers = 'From: osx_noreply@se51.net' . "\r\n" .    'Content-Type: text/html; charset=ISO-8859-1' . "\r\n" .
    'Content-Transfer-Encoding: 7bit' . "\r\n" .
    'Content-Disposition: inline' . "\r\n" .    'X-Mailer: PHP/' . phpversion();//Check for success/failure of delivery
mail( $to,$subject,$body,$headers );

// echo "$body";

header( "Location: mailsend.html" );

?>