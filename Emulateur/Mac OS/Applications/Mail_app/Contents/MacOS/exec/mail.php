<?

// Mail for Mercury.
// This finally takes care of sending mails, well, from Mail.

$mailtext = $_POST['elm1'];

$body = stripslashes($mailtext);

$from = $_POST['from'];
$headers = 'From: osx_noreply@se51.net' . "\r\n" .
    'Content-Transfer-Encoding: 7bit' . "\r\n" .
    'Content-Disposition: inline' . "\r\n" .
mail( $to,$subject,$body,$headers );

// echo "$body";

header( "Location: mailsend.html" );

?>