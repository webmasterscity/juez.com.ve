<?php

	/*
	|| #################################################################### ||
	|| #                             chat                            # ||
	|| # ---------------------------------------------------------------- # ||
	|| #    Copyright �2010-2012 ArrowSuites LLC. All Rights Reserved.    # ||
	|| # This file may not be redistributed in whole or significant part. # ||
	|| # ---------------- chat IS NOT FREE SOFTWARE ---------------- # ||
	|| #   http://www.chat.com | http://www.chat.com/license/   # ||
	|| #################################################################### ||
	*/
	
	// ########################## INCLUDE BACK-END ###########################
	require_once (dirname(dirname(dirname(__FILE__))) . DIRECTORY_SEPARATOR . 'bootstrap.php');
	
	$chatroom_id = get_var('id');

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en-gb" xml:lang="en-gb"> 
<head> 

	<title>Popout Chat Room</title>
	
	<link type="text/css" rel="stylesheet" media="all" href="<?php echo $base_url; ?>external.php?type=css" charset="utf-8" /> 
	
	<script type="text/javascript">
		var ac_chatroom_id = <?php echo $chatroom_id; ?>;
	</script>
	
	<script type="text/javascript" src="<?php echo $base_url; ?><?php echo AC_FOLDER_INCLUDES; ?>/js/jquery.js"></script>
	<script type="text/javascript" src="<?php echo $base_url; ?>external.php?type=djs" charset="utf-8"></script> 
	<script type="text/javascript" src="<?php echo $base_url; ?>public/chatroom/js/chatroom_libraries.js" charset="utf-8"></script> 
	<script type="text/javascript" src="<?php echo $base_url; ?>public/chatroom/js/chatroom_core.js" charset="utf-8"></script> 
	
	<style type="text/css"> 
	
		body, html {
			margin: 0px;
			padding: 0px;
			height: 100%;
			width: 100%;
			font-size: 11px;
			font-family: 'Lucida Grande', Verdana, Arial;
		}
	
	</style>

</head>
<body>
	<div id="chat_sound_player_holder"></div>
	<div id="chat_popout_wrapper">
		<div id="chat_popout_left">
			<div id="chat_popout_friends">
				<div id="chat_chatroom_line_admins" class="chat_group_container">
					<span class="chat_group_text"><?php echo $language[148]; ?></span>
					<div class="chat_group_line_container">
						<span class="chat_group_line"></span>
					</div>
				</div>
				<div id="chat_chatroom_list_admins"></div>
				<div id="chat_chatroom_line_mods" class="chat_group_container">
					<span class="chat_group_text"><?php echo $language[149]; ?></span>
					<div class="chat_group_line_container">
						<span class="chat_group_line"></span>
					</div>
				</div>
				<div id="chat_chatroom_list_mods"></div>
				<div id="chat_chatroom_line_users" class="chat_group_container">
					<span class="chat_group_text"><?php echo $language[147]; ?></span>
					<div class="chat_group_line_container">
						<span class="chat_group_line"></span>
					</div>
				</div>
				<div id="chat_chatroom_list_users"></div>
			</div>
		</div>
		<div id="chat_popout_right">
			<div id="chat_popout_chat">
				<div id="chat_chatroom_message_flyout" class="chat_message_box">
					<div class="chat_message_box_wrapper">
						<div>
							<span class="chat_message_text"></span>
						</div>
					</div>
				</div>	
			</div>
		</div>
	</div>
</body>
</html>