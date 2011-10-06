<?php
session_start();

if (isset($_GET['p']) && $_GET['p'] == 'logged') {
	if (isset($_SESSION['logged']) && !empty($_SESSION['logged'])) die('true'); else die('0');
}

require_once 'mysql.class.php';
require_once 'functions.inc.php';

function loggedIn() {

}

function logOut() {
	session_unset();
	session_destroy();
}

if (isset($_SESSION['logged'])) { loggedIn();
	if ($_SERVER['REQUEST_METHOD'] == 'POST') require_once 'ajax.inpost.inc.php';
	elseif ($_SERVER['REQUEST_METHOD'] == 'GET') require_once 'ajax.inget.inc.php';
} else {
	if ($_SERVER['REQUEST_METHOD'] == 'POST') require_once 'ajax.outpost.inc.php';
	elseif ($_SERVER['REQUEST_METHOD'] == 'GET') require_once 'ajax.outget.inc.php';
}
?>