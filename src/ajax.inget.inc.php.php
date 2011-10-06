<?php /* Logged In Get Request */
if (isset($_GET['p'])) {

if ($_GET['p'] == 'userdata') {
try {
	$db = new MySQL();
	if (!isset($_GET['uid'])) $uid = $_SESSION['user_id'];
	else $uid = $_GET['uid'];
	$db->query();
	if ($db->numRows() == 1) {
		header('Content-Type: text/javascript; charset=utf8');
		print_r(json_encode($db->fetchRow()));
	} else die('0');
} catch(Exception $e) {
	echo $e->getMessage();
	exit();
}
}

}
?>