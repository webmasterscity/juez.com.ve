<style>
video {
    background-size: cover;
    bottom: 0;
    height: auto;
    min-height: 100%;
    min-width: 100%;
    position: fixed;
    right: 0;
    width: auto;
    z-index: -100;
 opacity: 0.9;
 
    box-shadow:         12px 9px 13px rgba(0,0, 0, 0.9);   
    
}
.transparente{
 /* Fallback for web browsers that don't support RGBa */
    background-color: #fff);
    /* RGBa with 0.6 opacity */
    background-color: rgba(255, 255, 255, 0.75);
    /* For IE 5.5 - 7*/
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);
    /* For IE 8*/
    -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";

	}

.no_fondo{
	background:transparent;
	}
</style>


		
			<div class="col-md-3">
			</div>
			<div class="col-md-5">
				<br><br>
				<?php echo formulario_login2(); ?>
			</div>
		

<script src="js/login.js"></script>



<?php 
	function formulario_login2(){
		$html.='
	<div class="panel panel-default transparente">
		<div class="panel-heading center no_transparente">
			Panel de acceso
		</div>
		<div class="panel-body">
			
			<form role="form" method="post" action="?'.codificar('vista=intranet').'" autocomplete="off">
			<div class="body-content">
				<div class="form-group">
					<div class="input-group" style="width:100%">
							<input type="hidden" name="nacionalidad" id="nacionalidad" value="V">
							<div class="input-group-btn" style="width:40px ">
								<button style=""  type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span id="button_nacionalidad">V</span> <span class="caret"></span></button>
								<ul class="dropdown-menu" role="menu">
									<li><a href="#"  onclick="return cambiar_rif_combo_usuario(\'V\')">V </a></li>
									<li><a href="#" onclick="return cambiar_rif_combo_usuario(\'E \')">E </a></li>
								</ul>
							</div>
					<div class="input-icon right"><i class="fa fa-user"></i><input required title="Solo debe escribir numeros" type="text" required pattern="^[0-9]+$" placeholder="Cedula" name="cedula" class="form-control"></div>
					</div>
				</div>
				<div class="form-group">
					<div class="input-icon right"><i class="fa fa-key"></i><input required type="password" placeholder="Clave" name="clave" class="form-control"></div>
				</div>
				<div class="form-group pull-left">
					<div class="checkbox-list"><label></div>
				</div>
				<div class="form-group pull-right">
					<button type="submit" name="evento" value="acceder" class="btn btn-primary">Iniciar sesión
						&nbsp;<i class="fa fa-chevron-circle-right"></i></button>
				</div>
				<div class="clearfix"></div>
				<div class="forget-password"><p>Ha olvidado su clave?</p>

					<p>No te preocupes, has click <a href="?'.codificar('vista=recuperar_email').'" class="btn-forgot-pwd">aquí</a> y recuperala.</p></div>
				<hr>
				<p>Aun no estas registrado? <a id="btn-register" href="?'.codificar('vista=usuario').'">Registrarme.</a></p></div>
		</form>
	<hr>';
	return $html;
}
?>
