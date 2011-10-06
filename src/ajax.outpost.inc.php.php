<?php /* LoggedOut POST Request */
if (isset($_POST['login'])) {
try {
	$db = new MySQL();
	$db->sfquery(array('SELECT * FROM misc WHERE username = "%s" AND pass = PASSWORD("%s") LIMIT 1',$_POST['username'],$_POST['password']));
	if ($db->numRows() > 0) {
		$row = $db->fetchAssocRow();
		loggedIn($row);
	} else die('0');
} catch(Exception $e) {
	echo $e->getMessage();
	exit();
}
} elseif (isset($_POST['register'])) {
$username = (isset($_POST['username'])) ? $_POST['username'] : '';
$password = (isset($_POST['password'])) ? $_POST['password'] : '';
try {
	$db = new MySQL();
	$db->insert('misc', array(
		'username'=>$username,
		'date_joined'=>date('Y-m-d'),
	));
	$user_id = $db->insertID();
	$db->query('UPDATE misc SET pass = PASSWORD("'.mysql_real_escape_string($password).'") WHERE user_id = '.$user_id);
	if ($db->affectedRows() == 1) {
		$_SESSION['logged'] = true;
		$_SESSION['user_id'] = $user_id;
		$_SESSION['username'] = $username;
		die('true');
	} else die('false');
} catch(Exception $e) {
	echo $e->getMessage();
	exit();
}
loggedIn();
}
?>