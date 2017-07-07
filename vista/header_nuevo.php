<!DOCTYPE html>
<html lang="es">
<head><title>Sistema de Entrenamiento para Competencias Internacionales de Programación</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="images/favicon-32x32.png"/>
    <link rel="apple-touch-icon" href="images/icons/favicon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="images/icons/favicon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="images/icons/favicon-114x114.png">
    <link type="text/css" rel="stylesheet" href="css/index.css">
    <link type="text/css" rel="stylesheet" href="css/combinado2.css">

    <!--Loading style-->
    <link type="text/css" rel="stylesheet" href="css/themes/style1/<?php echo $_SESSION['tema']; ?>" id="theme-change" class="style-change color-change">
	
<!--CARGAR STILO NOTIFICACIONES-->
<script type="text/javascript" src="libreria/combinado.js.php"></script>



</head>
<body>
<div>
	<?php
	//ESCONDER MENU SI EN LA DB USUARIO_ESTILO LO AMERITA
	
echo ocultar_menu();
?>
 <div id="header-topbar-option-demo" class="page-header-topbar">
        <nav id="topbar" role="navigation" style="margin-bottom: 0;" data-step="3" data-intro="&lt;b&gt;Topbar&lt;/b&gt; has other styles with live demo. Go to &lt;b&gt;Layouts-&gt;Header&amp;Topbar&lt;/b&gt; and check it out." class="navbar navbar-default navbar-static-top">
            <div class="navbar-header">
                <button type="button" data-toggle="collapse" data-target=".sidebar-collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
                <a id="logo" href="index.php" class="navbar-brand"><span class="fa fa-rocket"></span><span class="logo-text-icon"><img style="margin-top:-12px ;height:45px" src="images/logo_ovi.opt.png"></span></a></div>
            <div class="topbar-main"><a id="menu-toggle" href="#" class="hidden-xs"><i class="fa fa-bars"></i></a>


                <div class="news-update-box hidden-xs"><span class="text-uppercase mrm pull-left">Noticias:</span>
                    <ul id="news-update" class="ticker list-unstyled">
                        <li>Bienvenido a OVIJUDGE</li>
                        <li>Sistema de Entrenamiento para Competencias Internacionales de Programación.</li>
                    
                    </ul>
                </div>
                
                <?php  //echo formulario_login(); ?>
                
				 <ul class="nav navbar navbar-top-links navbar-right mbn">
						<?php 
						if($_SESSION['login']){
							echo top_perfil_logueado();
						}else{
						//	echo formulario_login();
							echo top_perfil_invitado();
							
							}
						?>
                   </ul>
                  
				
            </div>

        </nav>
	</div>
    <!--END TOPBAR-->
    <div id="wrapper"><!--BEGIN SIDEBAR MENU-->
        <nav id="sidebar" role="navigation" data-step="2" data-intro="Template has &lt;b&gt;many navigation styles&lt;/b&gt;" data-position="right" class="navbar-default navbar-static-side">
            <div class="sidebar-collapse menu-scroll">
				
                <ul id="side-menu" class="nav">
					<li class="user-panel">
						<?php if($_SESSION['login']) echo panel_usuario(); ?>
						<div class="clearfix"></div>
                    </li>
                    <li ><a href="index.php"><i class="fa fa-home fa-fw">
                        <div class="icon-bg bg-orange"></div>
                    </i><span class="menu-title">Inicio</span></a></li>
					<?php echo menu_lateral($vista); ?>
                </ul>
            </div>
        </nav>
    <!--END SIDEBAR MENU-->
	<!--BEGIN PAGE WRAPPER-->
        <div id="page-wrapper"><!--BEGIN TITLE & BREADCRUMB PAGE-->
   <?php     
		function panel_usuario(){
			$html.='    
                        <div class="thumb">'.foto_perfil_peque_redonda($_SESSION['cedula']).'</div>
                        <div class="info center" ><p style="font-size:12px">'.ucwords(strtolower($_SESSION['nombre_usuario'].' '.$_SESSION['apellido_usuario'])).'<br>'.ucwords(strtolower($_SESSION['nombre_tipo_usuario'])).'</p>
                            <ul class="list-inline list-unstyled">
                                <li><a href="?'.codificar('vista=mi_perfil').' " data-hover="tooltip" title="Mi perfil"><i class="fa fa-user"></i></a></li> 
								<li><a href="?'.codificar('vista=tema').' " data-hover="tooltip" title="Tema"><i class="glyphicon glyphicon-tint"></i></a></li> 
								<li><a href="?'.codificar('vista=intranet&evento=salir').' " data-hover="tooltip" title="Cerrar sesión"><i class="fa fa-sign-out"></i></a></li>
                            </ul>
                        </div>
                        ';
			return $html;
			}
        function menu_lateral($vista_actual){
			  include_once("modelo/class_modulo.php");
			  include_once("modelo/class_vista_sistema.php");
			  include_once("modelo/class_servicio.php");
			  include_once("modelo/class_privilegio.php");

			  $modulo_menu= new modulo;
			  $vista_menu= new vista_sistema;
			  $servicio_menu= new servicio;
			  $privilegio			= new privilegio;
			  $cod_tipo_usuario=$_SESSION['cod_tipo_usuario'];
			  $privilegio->set_cod_tipo_usuario($cod_tipo_usuario);
			  $privilegio->consultar_por_cod_tipo_usuario();
			  
			  
				while($row=$privilegio->row()){
					$cod_vista_sistema=$_SESSION['cod_vista_'.$vista_actual];
					if($row['cod_vista_sistema']==$cod_vista_sistema){
					$modulo_activo[$row['cod_modulo']]='class="active"';
					$servicio_activo[$row['cod_servicio']]='class="active"';
					$vista='class="active"';
					
					}
					
					$modulos[$row['cod_modulo']]['abre_li_modulo']='
					<li '.$modulo_activo[$row['cod_modulo']].' >
						<a href="#" >
						<i class=" '.$row['icono_modulo'].' "></i>
						<span class="menu-title">'.$row['nombre_modulo'].' </span><span class="fa arrow"></span> </a>
						<ul class="nav nav-second-level">
						';
					$modulos[$row['cod_modulo']]['cierra_li_modulo']='</ul></li>';
					$servicios[$row['cod_modulo']][$row['cod_servicio']]['abre_li_servicio']='<li '.$servicio_activo[$row['cod_servicio']].' >';
					$servicios[$row['cod_modulo']][$row['cod_servicio']]['nombre_servicio']='<a  href="#"><i class="fa fa-angle-right"></i><span class="submenu-title">'.$row['nombre_servicio'].'</span><span class="fa arrow"></span></a>';
					$servicios[$row['cod_modulo']][$row['cod_servicio']]['abre_ul_servicio']='<ul class="nav nav-third-level" >';
					$servicios[$row['cod_modulo']][$row['cod_servicio']]['cierra_ul_servicio']='</ul>';
					$servicios[$row['cod_modulo']][$row['cod_servicio']]['cierra_li_servicio']='</li>';
					$vistas[$row['cod_modulo']][$row['cod_servicio']][$row['cod_vista_sistema']]['todo']='<li '.$vista.' ><a '.($row['tipo_apertura'] ? 'target="_blank"' : '').' href="?'.codificar('vista='.$row['nombre']).'" >'.$row['descripcion'].'</a></li>';
					
					$vista="";
				}
				foreach($modulos as $cod_modulos=>$modulos){
					$salida.=$modulos['abre_li_modulo'];
					foreach($servicios[$cod_modulos] as $cod_servicios=>$servicios[$cod_modulos]){
						$i=0;
						foreach($vistas[$cod_modulos][$cod_servicios] as $cod_vista_sistemas=>$vistas[$cod_modulos][$cod_servicios]){
							$i++;
							$salida_vista.=$vistas[$cod_modulos][$cod_servicios]['todo'];	
						}
						if($i>1){
							$salida.=$servicios[$cod_modulos]['abre_li_servicio'].$servicios[$cod_modulos]['nombre_servicio'].$servicios[$cod_modulos]['abre_ul_servicio'].$salida_vista.$servicios[$cod_modulos]['cierra_ul_servicio'].$servicios[$cod_modulos]['cierra_li_servicio'];
						}else{
							$salida.=$salida_vista;
						}
						$salida_vista='';

					}
					$salida.=$modulos['cierra_li_modulo'];	
				}
				return $salida;
	}
function tiempo_transcurrido($time)
{
    $periodos = array("segundo", "minuto", "hora", "día", "semana", "mes", "año", "década");
    $duraciones = array("60","60","24","7","4.35","12","10");
    $now = time();
    $diferencia = $now - $time;
 
    for($j = 0; $diferencia >= $duraciones[$j] && $j < count($duraciones)-1; $j++) {
        $diferencia /= $duraciones[$j];
    }
    $diferencia = round($diferencia);
 
    if($diferencia != 1) {
        if($j != 5){
            $periodos[$j].= "s";
        }else{
            $periodos[$j].= "es";
        }
    }
 
   return "hace $diferencia $periodos[$j]";
}	
	function top_perfil_logueado(){
		include_once("modelo/class_notificacion.php");
		$notificacion = new notificacion;
		$notificacion->set_cod_usuario($_SESSION['cod_usuario']);
		$no_visto=$notificacion->no_visto();
		if($notificacion->ultimo(5)>0){
		while($row_notificacion=$notificacion->row()){
			$tiempo=tiempo_transcurrido(strtotime($row_notificacion['fecha']));
			$estatus=$row_notificacion['estatus'];
			$li.='<li><a href="?'.codificar('vista=notificacion').'"><span class="label label-blue"><i class="fa fa-envelope"></i></span>'.($estatus ? '' : '<span class="label label-blue pull-right">Nuevo</span>').ucwords(strtolower(substr($row_notificacion['mensaje'],0,20))).'...<span class="pull-right text-muted small">'.$tiempo.'</span></a></li>';
			
			}
			
		}
		$html.='
				     <li class="dropdown"><a data-hover="dropdown" href="#" class="dropdown-toggle"><i class="fa fa-envelope fa-fw"></i><span class="badge badge-green">'.$no_visto.'</span></a>
                        <ul class="dropdown-menu dropdown-alerts">
                            <li><p>Tienes '.$no_visto.' notificaciones nuevas</p></li>
                            <li>
                                <div class="dropdown-slimscroll">
                                    <ul>
										'.$li.'
                                    </ul>
                                </div>
                            </li>
                            <li class="last"><a href="?'.codificar('vista=notificacion').'" class="text-right">Ver todas</a></li>
                        </ul>
                    </li>&nbsp&nbsp
	
                   ';
                   return $html;
		}
		
	function top_perfil_invitado(){
		$html.='
				 <li class="dropdown topbar-user"><a data-hover="dropdown" href="?'.codificar('vista=login').'" class="dropdown-toggle">'.foto_perfil_peque_redonda($_SESSION['cedula']).'&nbsp;<span class="hidden-xs">Iniciar sesión</span>&nbsp;</a>
                    
                    </li>
                   ';
                   return $html;
		}
function formulario_login(){
		$html.='
		<li class="dropdown">
		<div class="input-group" style="width:100%; margin-top:6px">
						<input type="hidden" name="nacionalidad" id="nacionalidad" value="V">
						<div class="input-group-btn" style="width:40px">
							<button style="border-top-right-radius:0px; border-bottom-right-radius:0px; border-right:0px"  type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span id="button_nacionalidad">V</span> <span class="caret"></span></button>
						    <ul class="dropdown-menu" role="menu">
								<li><a href="#"  onclick="return cambiar_rif_combo_usuario(\'V\')">V </a></li>
								<li><a href="#" onclick="return cambiar_rif_combo_usuario(\'E\')">E </a></li>
							</ul>
						</div>
				  <input style="width:150px; margin-right:2px" name="cedula" required pattern="^[0-9]+$" title="Solo debe escribir numeros" type="text" onkeyup="this.value=this.value.toUpperCase()" placeholder="Usuario" class="form-control">
				   <input style="width:150px" required name="clave" type="password" placeholder="Clave" title="Introdusca su clave" class="form-control">
				 <button type="submit" name="evento" value="acceder" class="btn btn-primary">Acceder</button>
				 </div>
		</li>
				
				
				
				
				';
		return $html;
}


?>
