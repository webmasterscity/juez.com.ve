<?php
/* Smarty version 3.1.29, created on 2016-11-01 20:08:01
  from "/var/www/html/chat/admin/layout/pages_login.tpl" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_58192e61042071_98946245',
  'file_dependency' => 
  array (
    '7562e0fc4dbcd7930b88514dcd316e71563a9d60' => 
    array (
      0 => '/var/www/html/chat/admin/layout/pages_login.tpl',
      1 => 1477876725,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_58192e61042071_98946245 ($_smarty_tpl) {
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr"> 
<head profile="http://gmpg.org/xfn/11"> 
 
	<title>Administrar Chat</title> 

	<link rel="stylesheet" type="text/css" href="includes/css/login-style.css"> 
	
	<?php echo '<script'; ?>
 type="text/javascript" src="../../libreria/jquery/js/jquery-1.8.3.min.js"><?php echo '</script'; ?>
> 
	<?php echo '<script'; ?>
 type="text/javascript" src="../../libreria/jquery/js/jquery-ui.min.js"><?php echo '</script'; ?>
>
	<?php echo '<script'; ?>
 type="text/javascript" src="includes/js/scripts.js"><?php echo '</script'; ?>
>
	
	<?php echo '<script'; ?>
 type="text/javascript">
		$(document).ready(function() {
			var emitter;
			$('#logo').animate({ 'marginLeft':'0%'}, 500, function () {
				emitter = new particle_emitter({
					image: ['./images/particle.gif'],
					center: ['50%', '140px'], offset: [-250, 0], radius: 0,
					size: 2, velocity: 100, decay: 1000, rate: 20
				}).start();
			});
			$('.fwdbutton').click(function() {
				emitter.stop();
				$('#logo').animate({ 'marginLeft':'-200%'}, 500, function () {
					document.forms['login'].submit();
				});
				
			});
			$(document).keypress(function(e) {
				if(e.keyCode == 13) {
					emitter.stop();
					$('#logo').animate({ 'marginLeft':'-200%'}, 500, function () {
						document.forms['login'].submit();
					});
				}
			});
			$('.login-form').illuminate({ 'intensity':'0.3','outGlow':'true','outerGlowSize':'30px','outerGlowColor':'#ffffff','blink':'false','color':'#ffffff'});
		});
	<?php echo '</script'; ?>
>
	
</head>
<body>
	<div style="margin: 0 auto; width: 550px; text-align: center; padding-top: 100px;">
		<div id="logo" style="margin-left: -200%; width: 521px; height: 69px;">
			<img id="logo2" src="./images/img-logo.png" alt="chat Logo" border="0" />
		</div>
		<div class="login-form">
			<form autocomplete="off" action="./" id="login" method="post"> 
				<div class="admin-panel-text">Panel para administrar el chat</div>
				<div style="clear: both;"></div>
				<div class="input-text">Usuario</div>
				<div class="input-box">
					<input class="text" id="username" name="username" value="<?php if (!empty($_smarty_tpl->tpl_vars['username_post']->value)) {
echo $_smarty_tpl->tpl_vars['username_post']->value;
}?>" type="text" />
				</div>
				<div style="clear: both;"></div>
				<div class="input-text">Clave</div>
				<div class="input-box">
					<input class="text" name="password" value="<?php if (!empty($_smarty_tpl->tpl_vars['password_post']->value)) {
echo $_smarty_tpl->tpl_vars['password_post']->value;
}?>"  type="password" />
					<input type="hidden" name="login" value="1" />
				</div>
				<div style="clear: both;"></div>
				<div class="button_container float">
					<div class="login-error">
						<?php echo $_smarty_tpl->tpl_vars['error']->value;?>

					</div>
					<div class="floatr">
						<a class="fwdbutton">
							<span>Acceder</span>
						</a>
					</div>
					<div class="forgot">
						<a href="#" class="vtip" title="La clave solo es cambiada directamente en la tabla del administrador de la base de datos.">Recuperar clave</a><span class="forgot-big">&nbsp;&nbsp;&nbsp;|</span> 
					</div>
				</div>
				<div style="clear: both;"></div>
			</form> 
		</div>
	</div>
	<?php echo '<script'; ?>
 type="text/javascript">
		document.getElementById("username").focus();
	<?php echo '</script'; ?>
>
</body>
</html>
<?php }
}
