<html>
<head>
<title>Displays the output of a TinyMCE</title>
</head>
<body>

<?

$mailtext = $_REQUEST['elm1'];
$body = stripslashes($mailtext);

?>

<? echo "$body" ?>





</body>
</html>

