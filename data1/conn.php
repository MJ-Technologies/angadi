<?php

$conn = @mysql_connect('loaclhost','root','');
//$conn = @mysql_connect('localhost','root','');
if (!$conn) {
	die('Could not connect: ' . mysql_error());
}
mysql_select_db('db', $conn);
//mysql_select_db('test', $conn);

?>