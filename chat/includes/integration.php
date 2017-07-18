<?php
	function get_user_id() 
	{
		session_start();
		$userid = NULL;
		
		if (isset($_SESSION['cod_usuario']))
		{
			$userid = $_SESSION['cod_usuario'];
		}
		
		return $userid;
	}

	/**
	 * This function returns the SQL statement for the buddylist of the user.  You should retrieve
	 * all ONLINE friends that the user is friends with.  Do not retrieve offline users.  You can use
	 * global $online_timeout to get the online timeout.
	 * ex: AND (chat_status.session_time + 60 + " . $online_timeout . ") > " . time() . " 
	 *
	 * @param userid the user ID of the person receiving the buddylist
	 * @param the time of the buddylist request
	 * @return the SQL statement to retrieve the user's friend list
	 */
	function get_friend_list($userid, $time)
	{
		global $db;
		global $online_timeout;
		
		$sql = ("
			SELECT DISTINCT u.cod_usuario userid, CONCAT(p.nombre,' ',p.apellido) username, chat_status.session_time lastactivity, p.foto_perfil_peque avatar, u.cod_usuario link, chat_status.is_admin, chat_status.status 
			FROM " . TABLE_PREFIX . DB_FRIENDSTABLE . " 
			INNER JOIN persona p using (cedula)
			JOIN usuario u
				ON  " . TABLE_PREFIX . DB_FRIENDSTABLE . "." . DB_FRIENDSTABLE_FRIENDID . " = " . TABLE_PREFIX . DB_USERTABLE . "." . DB_USERTABLE_USERID . " 
			LEFT JOIN chat_status 
				ON " . TABLE_PREFIX . DB_USERTABLE . "." . DB_USERTABLE_USERID . " = chat_status.userid 
			WHERE " . TABLE_PREFIX . DB_FRIENDSTABLE . "." . DB_FRIENDSTABLE_USERID . " = '" . $db->escape_string($userid) . "' 
				AND " . TABLE_PREFIX . DB_FRIENDSTABLE . "." . DB_FRIENDSTABLE_FRIENDS . " = 1 
				AND chat_status.session_time > (" . time() . " - " . $online_timeout . " - 60)
			ORDER BY " . TABLE_PREFIX . DB_USERTABLE . "." . DB_USERTABLE_NAME . " ASC
		");
		
		return $sql; 
	}

	/**
	 * This function returns the SQL statement for all online users.  You should retrieve
	 * all ONLINE users regardless of friend status.  Do not retrieve offline users.  You can use
	 * global $online_timeout to get the online timeout.
	 * ex: AND (chat_status.session_time + 60 + " . $online_timeout . ") > " . time() . " 
	 *
	 * @param userid the user ID of the person receiving the buddylist
	 * @param the time of the buddylist request
	 * @return the SQL statement to retrieve all online users
	 */
	function get_online_list($userid, $time) 
	{
		global $db;
		global $online_timeout;
		
		$sql = ("
			SELECT DISTINCT u.cod_usuario userid, CONCAT(p.nombre,' ',p.apellido) username, chat_status.session_time lastactivity, p.foto_perfil_peque avatar, u.cod_usuario link, chat_status.is_admin, chat_status.status 
			FROM usuario u 
			INNER JOIN persona p USING(cedula)
			JOIN chat_status 
				ON u.cod_usuario = chat_status.userid 
			WHERE chat_status.session_time > (" . time() . " - " . $online_timeout . " - 60)
				AND u.cod_usuario != '" . $db->escape_string($userid) . "' 
			ORDER BY u.cod_usuario ASC
		");
		
		return $sql; 
	}

	/**
	 * This function returns the SQL statement to get the user details of a specific user.  You should
	 * get the user's ID, username, last activity time in unix, link to their profile, avatar, and status.
	 *
	 * @param userid the user ID to get the details of
	 * @return the SQL statement to retrieve the user's defaults
	 */
	function get_user_details($userid) 
	{
		global $db;
		
		$sql = ("
			SELECT u.cod_usuario userid, CONCAT(p.nombre,' ',p.apellido) username, chat_status.session_time lastactivity,  u.cod_usuario link,  p.foto_perfil_peque avatar, chat_status.is_admin, chat_status.status 
			FROM usuario u 
			INNER JOIN persona p USING(cedula)
			LEFT JOIN chat_status 
				ON u.cod_usuario = chat_status.userid 
			WHERE u.cod_usuario = '" . $db->escape_string($userid) . "'
		");
		
		return $sql;
	}

	/**
	 * This function returns the profile link of the specified user ID.
	 *
	 * @param userid the user ID to get the profile link of
	 * @return the link of the user ID's profile
	 */
	function codificar($msj){
		# la clave debería ser binaria aleatoria, use scrypt, bcrypt o PBKDF2 para
		# convertir un string en una clave
		# la clave se especifica en formato hexadecimal
		$key = pack('H*', "6c656f6e6172646f206a65737573206d656c656e64657a2073756c626172616e");
	$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
		
		# mostrar el tamaño de la clave, use claves de 16, 24 o 32 bytes para AES-128, 192
		# y 256 respectivamente
		$key_size =  strlen($key);
		# crear una aleatoria IV para utilizarla co condificación CBC
		
		$iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
		
		# crea un texto cifrado compatible con AES (tamaño de bloque Rijndael = 128)
		# para hacer el texto confidencial 
		# solamente disponible para entradas codificadas que nunca finalizan con el
		# el valor  00h (debido al relleno con ceros)
		$msj = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key,
									 $msj, MCRYPT_MODE_CBC, $iv);

		# anteponer la IV para que esté disponible para el descifrado
		$msj = $iv . $msj;
		
		# codificar el texto cifrado resultante para que pueda ser representado por un string
		$ciphertext_base64 = base64_encode($msj);

		return  $ciphertext_base64;		
		}
	function get_link($link, $user_id) 
	{
		
		global $base_url;
		
		return "?".codificar('vista=dato_personal&evento=dato_personal_html&cod='.$link);
	}

	/**
	 * This function returns the URL of the avatar of the specified user ID.
	 *
	 * @param userid the user ID of the user
	 * @param image if the image includes more than just a user ID, this param is passed
	 * in from the avatar row in the buddylist and get user details functions.
	 * @return the link of the user ID's profile
	 */
	function get_avatar($image, $user_id) 
	{
		global $base_url;
		
		if (is_file(dirname(dirname(dirname(__FILE__))) . '/'.$image)) 
		{
			return $base_url . '../'.$image;
		} 
		else 
		{
			return $base_url . AC_FOLDER_ADMIN . "/images/img-no-avatar.gif";
		}
	}
	
	/**
	 * #### OPTIONAL ##### 
	 * It is not required that you change this function for chat to work.
	 *
	 * This function returns the group ID of the user into an array.
	 *
	 * @param userid the user ID of the user
	 * @return an array of groups the user is in or NULL if no groups
	 *		Example Array:
	 *			Array
	 *			(
	 *				[0] => 4
	 *				[1] => 7
	 *				[2] => 6
	 *			)
	 *
	 * Example of this function has been commented out.
	 *
	 */ 
	function get_group_id($userid)
	{	
		global $db;
		
		$group_ids = array();
      
		
		// Get all the groups the user ID is in
		$result = $db->execute("
			SELECT cod_tipo_usuario
			FROM usuario
			INNER JOIN tipo_usuario USING(cod_tipo_usuario)
			WHERE usuario.cod_usuario = '" . $db->escape_string($userid) . "'
		");
      
		if ($result AND $db->count_select() > 0) 
		{	 
			while ($row = $db->fetch_array($result))
			{
				// Fill the group IDs into an array
				$group_ids[] = $row['cod_tipo_usuario'];
			}
			 
			return $group_ids;
		}
		else
		{
			return NULL;
		}
		
		
		// Delete following line after customizing this function
		#return NULL;
	}
	
	/**
	 * #### OPTIONAL ##### 
	 * It is not required that you change this function for chat to work.
	 *
	 * This function returns an array of all the groups and their names so that
	 * the chat admin panel can manage them.
	 *
	 * @return Nested arrays of the group IDs and names.
	 *		Example Array:
	 *			Array
	 *			(
	 *				[0] => Array
	 *					(
	 *						[0] => 1
	 *						[1] => "Administrators"
	 *					)
	 *				[1] => Array
	 *					(
	 *						[0] => 2
	 *						[1] => "Users"
	 *					)
	 *			)
	 *
	 * Example of this function has been commented out.
	 *
	 */ 
	function get_all_groups()
	{	
		global $db;
		
		$groups = array();
		
		
		// Get all the group IDs and group names that are available on your site
		$result = $db->execute("
			SELECT cod_tipo_usuario, nombre
			FROM tipo_usuario
		");
		
		if ($result AND $db->count_select() > 0) 
		{	 
			while ($row = $db->fetch_array($result))
			{
				// Fill an array with a nested array of (group id, group name)
				$groups[] = array($row['cod_tipo_usuario'], $row['nombre']);
			}
			 
			return $groups;
		}
		else
		{
			return NULL;
		}
		
		
		// Delete following line after customizing this function
		#return NULL;
	}

	/**
	 * This function returns the name of the logged in user.  You should not need to
	 * change this function.
	 *
	 * @param userid the user ID of the user
	 * @return the name of the user
	 */
	function get_username($userid) 
	{ 
		global $db;
		global $language;
		global $show_full_username;
		
		$users_name = $language[83];

		$result = $db->execute("
			SELECT CONCAT(p.nombre,' ',p.apellido) name 
			FROM usuario u
			INNER JOIN persona USING(cedula) 
			WHERE u = '" . $db->escape_string($userid) . "'
		");  

		if ($result AND $db->count_select() > 0)  
		{
			$row = $db->fetch_array($result); 
			$users_name = $row['name']; 
		}

		$pieces = explode(" ", $users_name);
		
		if ($show_full_username == 1)
		{
			return $users_name;
		}
		else
		{
			return $pieces[0]; 
		}
	} 

?>
