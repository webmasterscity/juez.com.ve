<?php

		
	/**
	 * Login the admin if user details are correct
	 *
	 * @param	string	$username	The username entered
	 * @param	string	$password	The password entered
	 * @return	string	NULL if logged in and the error message if not
	*/
	function admin_login($username, $password){
		

		global $db;
		global $base_url;
		
		if (!isset($_SESSION['chat_admin' . $base_url]))
		{
			if (!empty($username) AND !empty($password)) 
			{	
				$result = $db->execute("
					SELECT username, password
					FROM chat_admin
					WHERE username = '" . $db->escape_string($username) . "'
				");

				if ($result AND $db->count_select() > 0) 
				{
					$row = $db->fetch_array($result);
				
					if (strtolower($row['username']) == strtolower($_POST['username']) AND $row['password'] == md5($_POST['password'])) 
					{
						$_SESSION['chat_admin' . $base_url] = $row['username'];
						setcookie('chat_admin' . $base_url, md5($_POST['password']), time() + 3600 * 24);
						$error = NULL;
					} 
					else
					{
						$error = "Has introducido el usuario y/o clave incorrecto, por favor intente nuevamente.";
					}	
				} 
				else 
				{
					$error = "Has introducido el usuario y/o clave incorrecto, por favor intente nuevamente.";
				}
			}
			else
			{
				$error = "No has escrito el usuario y/o clave.  Intente nuevamente.";
			}
		}
		
		return $error;
	}
	
	/**
	 * Check and see if the computer is already logged in
	 *
	 * @param string $error An error message if one exists
	*/
	function admin_check_login($error)
	{
		
		global $db;
		global $smarty;
		global $base_url;
		
		if (isset($_SESSION['chat_admin' . $base_url])) {

		}else if (!empty($_COOKIE['chat_admin' . $base_url])){
			
			$result = $db->execute("
				SELECT username, password
				FROM chat_admin
				WHERE password = '" . $db->escape_string($_COOKIE['chat_admin' . $base_url]) . "'
			");

			if ($result AND $db->count_select() > 0) 
			{
				$row = $db->fetch_array($result);
				
				$_SESSION['chat_admin' . $base_url] = $row['username'];
			}
			else
			{
				$smarty->assign('error', $error);
				
				$smarty->display(dirname(dirname(dirname(__FILE__))) . DIRECTORY_SEPARATOR . "layout/pages_login.tpl");
				exit();
			}
		}
		else
		{
			
			$smarty->assign('error', $error);
			
			$dir=dirname(dirname(dirname(__FILE__))) . DIRECTORY_SEPARATOR . "layout/pages_login.tpl";
			
			$smarty->display($dir);
			
			exit();
		}
	}
	
	/**
	 * Logout of the admin panel by removing cookies and sessions
	 *
	*/
	function admin_logout()
	{
		global $base_url;
		
		unset($_SESSION['chat_admin' . $base_url]);
		setcookie('chat_admin' . $base_url, '', time() - 3600);
		session_write_close();
		header("Location: ./");	
	}
	
?>
