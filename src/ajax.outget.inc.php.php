<?php /* LoggedOut GET Request */
if (isset($_GET['p'])) {

if ($_GET['p'] == 'username') {
try {
	$db = new MySQL();
	$db->query('SELECT username FROM misc WHERE username = "'.$_GET['username'].'"');
	echo $db->numRows();
} catch(Exception $e) {
	echo $e->getMessage();
	exit();
}
}

}
?>