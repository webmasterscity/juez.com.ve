<?php
	
	header("Expires: Mon, 26 Jul 1990 05:00:00 GMT");
	header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
	header("Cache-Control: no-store, no-cache, must-revalidate");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");

	// ########################## INCLUDE BACK-END ###########################
	require_once (dirname(dirname(dirname(dirname(__FILE__)))) . DIRECTORY_SEPARATOR . 'bootstrap.php');
	require_once (dirname(dirname(dirname(dirname(__FILE__)))) . DIRECTORY_SEPARATOR . AC_FOLDER_INCLUDES . DIRECTORY_SEPARATOR . 'init.php');

	// ########################### GET POST DATA #############################

	// ###################### START POST NOTIFICATIONS #######################
	if (logged_in($userid)) 
	{
		$db->execute("
			UPDATE chat_notifications
			SET user_read = '1'
			WHERE to_id='" . $db->escape_string($userid) . "'
		");

		echo "1";
		close_session();
		exit(0);
	}
	
?>
