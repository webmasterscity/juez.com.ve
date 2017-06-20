<?php
ini_set('display_errors','OFF');
error_reporting(E_ALL ^E_NOTICE ^E_DEPRECATED);
session_start();
date_default_timezone_set("America/Manaus"); 
?>
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
    <!--Loading bootstrap css-->

    <link type="text/css" rel="stylesheet" href="libreria/jquery-ui-1.10.4.custom/css/ui-lightness/jquery-ui-1.10.4.custom.min.css">
    <link type="text/css" rel="stylesheet" href="libreria/font-awesome/css/font-awesome.min.css">
    <link type="text/css" rel="stylesheet" href="libreria/bootstrap/css/bootstrap.min.css">
    <!--LOADING STYLESHEET FOR PAGE-->
    <link type="text/css" rel="stylesheet" href="libreria/intro.js/introjs.css">
    <link type="text/css" rel="stylesheet" href="libreria/calendar/zabuto_calendar.min.css">
    <!--Loading style libreria-->
    <link type="text/css" rel="stylesheet" href="libreria/animate.css/animate.css">
    <link type="text/css" rel="stylesheet" href="libreria/jquery-pace/pace.css">
    <link type="text/css" rel="stylesheet" href="libreria/iCheck/skins/all.css">
    <link type="text/css" rel="stylesheet" href="libreria/jquery-news-ticker/jquery.news-ticker.css">
    <!--Loading style-->
    <link type="text/css" rel="stylesheet" href="css/themes/style1/leo-blue.css" id="theme-change" class="style-change color-change">
    <link type="text/css" rel="stylesheet" href="css/style-responsive.css">
</head>
<body>
<div>
	
 <div id="header-topbar-option-demo" class="page-header-topbar">
        <nav id="topbar" role="navigation" style="margin-bottom: 0;" data-step="3" data-intro="&lt;b&gt;Topbar&lt;/b&gt; has other styles with live demo. Go to &lt;b&gt;Layouts-&gt;Header&amp;Topbar&lt;/b&gt; and check it out." class="navbar navbar-default navbar-static-top">
            <div class="navbar-header">
                <button type="button" data-toggle="collapse" data-target=".sidebar-collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
                <a id="logo" href="index.html" class="navbar-brand"><span class="fa fa-rocket"></span><span class="logo-text-icon"><img style="margin-top:-12px ;height:45px" src="images/logo_ovi.fw.png"></span></a></div>
            <div class="topbar-main"><a id="menu-toggle" href="#" class="hidden-xs"><i class="fa fa-bars"></i></a>
                <ul class="nav navbar-nav    ">
                    <li class="active"><a href="index.html">Inicio</a></li>
                    <li><a href="javascript:;" data-toggle="dropdown" class="dropdown-toggle">Layouts
                        &nbsp;<i class="fa fa-angle-down"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="layout-left-sidebar.html">Left Sidebar</a></li>
                            <li><a href="layout-right-sidebar.html">Right Sidebar</a></li>
                            <li><a href="layout-left-sidebar-collasped.html">Left Sidebar Collasped</a></li>
                            <li><a href="layout-right-sidebar-collasped.html">Right Sidebar Collasped</a></li>
                            <li class="dropdown-submenu"><a href="javascript:;" data-toggle="dropdown" class="dropdown-toggle">More Options</a>
                                <ul class="dropdown-menu">
                                    <li><a href="#">Second level link</a></li>
                                    <li class="dropdown-submenu"><a href="javascript:;" data-toggle="dropdown" class="dropdown-toggle">More Options</a>
                                        <ul class="dropdown-menu">
                                            <li><a href="#">Third level link</a></li>
                                            <li><a href="#">Third level link</a></li>
                                            <li><a href="#">Third level link</a></li>
                                            <li><a href="#">Third level link</a></li>
                                            <li><a href="#">Third level link</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Second level link</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="mega-menu-dropdown"><a href="javascript:;" data-toggle="dropdown" class="dropdown-toggle">UI Elements
                        &nbsp;<i class="fa fa-angle-down"></i></a>
                        <ul class="dropdown-menu">
                            <li>
                                <div class="mega-menu-content">
                                    <div class="row">
                                        <ul class="col-md-4 mega-menu-submenu">
                                            <li><h3>Neque porro quisquam</h3></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i>Lorem ipsum dolor sit amet</a></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i>Consectetur adipisicing elit</a></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i>Sed ut perspiciatis unde omnis</a></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i>At vero eos et accusamus et iusto</a></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i>Nam libero tempore cum soluta</a></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i>Et harum quidem rerum facilis est</a></li>
                                        </ul>
                                        <ul class="col-md-4 mega-menu-submenu">
                                            <li><h3>Neque porro quisquam</h3></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i>Lorem ipsum dolor sit amet</a></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i>Consectetur adipisicing elit</a></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i>Sed ut perspiciatis unde omnis</a></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i>At vero eos et accusamus et iusto</a></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i>Nam libero tempore cum soluta</a></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i>Et harum quidem rerum facilis est</a></li>
                                        </ul>
                                        <ul class="col-md-4 mega-menu-submenu">
                                            <li><h3>Neque porro quisquam</h3></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i>Lorem ipsum dolor sit amet</a></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i>Consectetur adipisicing elit</a></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i>Sed ut perspiciatis unde omnis</a></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i>At vero eos et accusamus et iusto</a></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i>Nam libero tempore cum soluta</a></li>
                                            <li><a href="#"><i class="fa fa-angle-right"></i>Et harum quidem rerum facilis est</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li class="mega-menu-dropdown mega-menu-full"><a href="javascript:;" data-toggle="dropdown" class="dropdown-toggle">Extras
                        &nbsp;<i class="fa fa-angle-down"></i></a>
                        <ul class="dropdown-menu">
                            <li>
                                <div class="mega-menu-content">
                                    <div class="row">
                                        <div class="col-md-7">
                                            <ul class="col-md-4 mega-menu-submenu">
                                                <li><h3>Neque porro quisquam</h3></li>
                                                <li><a href="#"><i class="fa fa-angle-right"></i>Lorem ipsum dolor sit amet</a></li>
                                                <li><a href="#"><i class="fa fa-angle-right"></i>Consectetur adipisicing elit</a></li>
                                                <li><a href="#"><i class="fa fa-angle-right"></i>Sed ut perspiciatis unde omnis</a></li>
                                                <li><a href="#"><i class="fa fa-angle-right"></i>At vero eos et accusamus et iusto</a></li>
                                                <li><a href="#"><i class="fa fa-angle-right"></i>Nam libero tempore cum soluta</a></li>
                                                <li><a href="#"><i class="fa fa-angle-right"></i>Et harum quidem rerum facilis est</a></li>
                                            </ul>
                                            <ul class="col-md-4 mega-menu-submenu">
                                                <li><h3>Neque porro quisquam</h3></li>
                                                <li><a href="#"><i class="fa fa-angle-right"></i>Lorem ipsum dolor sit amet</a></li>
                                                <li><a href="#"><i class="fa fa-angle-right"></i>Consectetur adipisicing elit</a></li>
                                                <li><a href="#"><i class="fa fa-angle-right"></i>Sed ut perspiciatis unde omnis</a></li>
                                                <li><a href="#"><i class="fa fa-angle-right"></i>At vero eos et accusamus et iusto</a></li>
                                                <li><a href="#"><i class="fa fa-angle-right"></i>Nam libero tempore cum soluta</a></li>
                                                <li><a href="#"><i class="fa fa-angle-right"></i>Et harum quidem rerum facilis est</a></li>
                                            </ul>
                                            <ul class="col-md-4 mega-menu-submenu">
                                                <li><h3>Neque porro quisquam</h3></li>
                                                <li><a href="#"><i class="fa fa-angle-right"></i>Lorem ipsum dolor sit amet</a></li>
                                                <li><a href="#"><i class="fa fa-angle-right"></i>Consectetur adipisicing elit</a></li>
                                                <li><a href="#"><i class="fa fa-angle-right"></i>Sed ut perspiciatis unde omnis</a></li>
                                                <li><a href="#"><i class="fa fa-angle-right"></i>At vero eos et accusamus et iusto</a></li>
                                                <li><a href="#"><i class="fa fa-angle-right"></i>Nam libero tempore cum soluta</a></li>
                                                <li><a href="#"><i class="fa fa-angle-right"></i>Et harum quidem rerum facilis est</a></li>
                                            </ul>
                                        </div>
                                        <div class="col-md-5 document-demo">
                                            <ul class="col-md-4 mega-menu-submenu">
                                                <li><a href="#"><i class="fa fa-info-circle"></i><span>Introduction</span></a></li>
                                                <li><a href="#"><i class="fa fa-download"></i><span>Installation</span></a></li>
                                            </ul>
                                            <ul class="col-md-4 mega-menu-submenu">
                                                <li><a href="#"><i class="fa fa-cog"></i><span>T3 Settings</span></a></li>
                                                <li><a href="#"><i class="fa fa-desktop"></i><span>Layout System</span></a></li>
                                            </ul>
                                            <ul class="col-md-4 mega-menu-submenu">
                                                <li><a href="#"><i class="fa fa-magic"></i><span>Customization</span></a></li>
                                                <li><a href="#"><i class="fa fa-question-circle"></i><span>FAQs</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>

                <div class="news-update-box hidden-xs"><span class="text-uppercase mrm pull-left">News:</span>
                    <ul id="news-update" class="ticker list-unstyled">
                        <li>Bienvenido a OVIJUDGE</li>
                        <li>Sistema de Entrenamiento para Competencias Internacionales de Programación.</li>
                    </ul>
                </div>

				
            </div>
        </nav>
        <!--BEGIN MODAL CONFIG PORTLET-->
        <div id="modal-config" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" data-dismiss="modal" aria-hidden="true" class="close">&times;</button>
                        <h4 class="modal-title">Modal title</h4></div>
                    <div class="modal-body"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend et nisl eget porta. Curabitur elementum sem molestie nisl varius, eget tempus odio molestie. Nunc vehicula sem arcu, eu pulvinar neque cursus ac. Aliquam ultricies lobortis magna et aliquam. Vestibulum egestas eu urna sed ultricies. Nullam pulvinar dolor vitae quam dictum
                        condimentum. Integer a sodales elit, eu pulvinar leo. Nunc nec aliquam nisi, a mollis neque. Ut vel felis quis tellus hendrerit placerat. Vivamus vel nisl non magna feugiat dignissim sed ut nibh. Nulla elementum, est a pretium hendrerit, arcu risus luctus augue, mattis aliquet orci ligula eget massa. Sed ut ultricies felis.</p></div>
                    <div class="modal-footer">
                        <button type="button" data-dismiss="modal" class="btn btn-default">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <!--END MODAL CONFIG PORTLET--></div>
    <!--END TOPBAR-->
    <div id="wrapper"><!--BEGIN SIDEBAR MENU-->
        <nav id="sidebar" role="navigation" data-step="2" data-intro="Template has &lt;b&gt;many navigation styles&lt;/b&gt;" data-position="right" class="navbar-default navbar-static-side">
            <div class="sidebar-collapse menu-scroll">
                <ul id="side-menu" class="nav">
                    <li class="user-panel">
						
                        <div class="clearfix"></div>
                    </li>
                    <li class="active"><a href="/"><i class="fa fa-home fa-fw">
                        <div class="icon-bg bg-orange"></div>
                    </i><span class="menu-title">Inicio</span></a></li>
					<?php echo menu_lateral(); ?>
                </ul>
            </div>
        </nav>
        <!--END SIDEBAR MENU--><!--BEGIN CHAT FORM-->
        <div id="chat-form" class="fixed">
            <div class="chat-inner"><h2 class="chat-header"><a href="javascript:;" class="chat-form-close pull-right"><i class="glyphicon glyphicon-remove"></i></a><i class="fa fa-user"></i>&nbsp;
                Chat
                &nbsp;<span class="badge badge-info">3</span></h2>

                <div id="group-1" class="chat-group"><strong>Favorites</strong><a href="#"><span class="user-status is-online"></span>
                    <small>Verna Morton</small>
                    <span class="badge badge-info">2</span></a><a href="#"><span class="user-status is-online"></span>
                    <small>Delores Blake</small>
                    <span class="badge badge-info is-hidden">0</span></a><a href="#"><span class="user-status is-busy"></span>
                    <small>Nathaniel Morris</small>
                    <span class="badge badge-info is-hidden">0</span></a><a href="#"><span class="user-status is-idle"></span>
                    <small>Boyd Bridges</small>
                    <span class="badge badge-info is-hidden">0</span></a><a href="#"><span class="user-status is-offline"></span>
                    <small>Meredith Houston</small>
                    <span class="badge badge-info is-hidden">0</span></a></div>
                <div id="group-2" class="chat-group"><strong>Office</strong><a href="#"><span class="user-status is-busy"></span>
                    <small>Ann Scott</small>
                    <span class="badge badge-info is-hidden">0</span></a><a href="#"><span class="user-status is-offline"></span>
                    <small>Sherman Stokes</small>
                    <span class="badge badge-info is-hidden">0</span></a><a href="#"><span class="user-status is-offline"></span>
                    <small>Florence Pierce</small>
                    <span class="badge badge-info">1</span></a></div>
                <div id="group-3" class="chat-group"><strong>Friends</strong><a href="#"><span class="user-status is-online"></span>
                    <small>Willard Mckenzie</small>
                    <span class="badge badge-info is-hidden">0</span></a><a href="#"><span class="user-status is-busy"></span>
                    <small>Jenny Frazier</small>
                    <span class="badge badge-info is-hidden">0</span></a><a href="#"><span class="user-status is-offline"></span>
                    <small>Chris Stewart</small>
                    <span class="badge badge-info is-hidden">0</span></a><a href="#"><span class="user-status is-offline"></span>
                    <small>Olivia Green</small>
                    <span class="badge badge-info is-hidden">0</span></a></div>
            </div>
            <div id="chat-box" style="top:400px">
                <div class="chat-box-header"><a href="#" class="chat-box-close pull-right"><i class="glyphicon glyphicon-remove"></i></a><span class="user-status is-online"></span><span class="display-name">Willard Mckenzie</span>
                    <small>Online</small>
                </div>
                <div class="chat-content">
                    <ul class="chat-box-body">
                        <li><p><img src="https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg" class="avt"/><span class="user">John Doe</span><span class="time">09:33</span></p>

                            <p>Hi Swlabs, we have some comments for you.</p></li>
                        <li class="odd"><p><img src="https://s3.amazonaws.com/uifaces/faces/twitter/alagoon/48.jpg" class="avt"/><span class="user">Swlabs</span><span class="time">09:33</span></p>

                            <p>Hi, we're listening you...</p></li>
                    </ul>
                </div>
                <div class="chat-textarea"><input placeholder="Type your message" class="form-control"/></div>
            </div>
        </div>
        <!--END CHAT FORM--><!--BEGIN PAGE WRAPPER-->
        <div id="page-wrapper"><!--BEGIN TITLE & BREADCRUMB PAGE-->
            <div id="title-breadcrumb-option-demo" class="page-title-breadcrumb">
                <div class="page-header pull-left">
                    <div class="page-title">Inicio</div>
                </div>
                <ol class="breadcrumb page-breadcrumb pull-right">
                    <li><i class="fa fa-home"></i>&nbsp;<a href="index.html">Inicio</a>&nbsp;&nbsp;<i class="fa fa-angle-right"></i>&nbsp;&nbsp;</li>
                    <li class="hidden"><a href="#">Inicio</a>&nbsp;&nbsp;<i class="fa fa-angle-right"></i>&nbsp;&nbsp;</li>
                    <li class="active">Inicio</li>
                </ol>
                <div class="clearfix"></div>
            </div>
            <!--END TITLE & BREADCRUMB PAGE--><!--BEGIN CONTENT-->
            <div class="page-content">
                <div id="tab-general">
                    <div id="sum_box" class="row mbl">
					<?php echo cajas_estadisticas(); ?>
                    </div>
                    <div class="row mbl">
                        <div class="col-lg-7">
								<?php echo estadisticas_lenguajes(); ?>
                            
                        </div>
                        <div class="col-lg-5">
								<?php echo timeline_concursos();?>
                        </div>
                    </div>

                </div>
            </div>
            <!--END CONTENT--><!--BEGIN FOOTER-->
            <div id="footer">
                <div class="copyright">2014 © &mu;Admin - Responsive Multi-Style Admin Template</div>
            </div>
            <!--END FOOTER--></div>
        <!--END PAGE WRAPPER--></div>
</div>
<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/jquery-migrate-1.2.1.min.js"></script>
<script src="js/jquery-ui.js"></script>
<!--loading bootstrap js-->
<script src="libreria/bootstrap/js/bootstrap.min.js"></script>
<script src="libreria/bootstrap-hover-dropdown/bootstrap-hover-dropdown.js"></script>
<script src="js/html5shiv.js"></script>
<script src="js/respond.min.js"></script>
<script src="libreria/metisMenu/jquery.metisMenu.js"></script>
<script src="libreria/slimScroll/jquery.slimscroll.js"></script>
<script src="libreria/jquery-cookie/jquery.cookie.js"></script>
<script src="libreria/iCheck/icheck.min.js"></script>
<script src="libreria/iCheck/custom.min.js"></script>
<script src="libreria/jquery-news-ticker/jquery.news-ticker.js"></script>
<script src="js/jquery.menu.js"></script>
<script src="libreria/jquery-pace/pace.min.js"></script>
<script src="libreria/holder/holder.js"></script>
<script src="libreria/responsive-tabs/responsive-tabs.js"></script>

<script src="libreria/flot-chart/jquery.flot.js"></script>
<script src="libreria/flot-chart/jquery.flot.categories.js"></script>
<script src="libreria/flot-chart/jquery.flot.pie.js"></script>
<script src="libreria/flot-chart/jquery.flot.tooltip.js"></script>
<script src="libreria/flot-chart/jquery.flot.resize.js"></script>
<script src="libreria/flot-chart/jquery.flot.fillbetween.js"></script>
<script src="libreria/flot-chart/jquery.flot.stack.js"></script>
<script src="libreria/flot-chart/jquery.flot.spline.js"></script>
<script src="libreria/calendar/zabuto_calendar.min.js"></script>
<script src="js/index.js"></script>
<!--CORE JAVASCRIPT-->
<script src="js/main.js"></script>
<!--
<script>(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-145464-12', 'auto');
ga('send', 'pageview');
-->

</script>
</body>
</html>

<?php
function menu_lateral(){
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
					$modulos[$row['cod_modulo']]['abre_li_modulo']='
					<li>
						<a href="#">'.$row['nombre_modulo'].' <span class="fa arrow"></span> </a>
						<ul class="nav nav-second-level">
						';
					$modulos[$row['cod_modulo']]['cierra_li_modulo']='</ul></li>';
					$servicios[$row['cod_modulo']][$row['cod_servicio']]['abre_li_servicio']='<li>';
					$servicios[$row['cod_modulo']][$row['cod_servicio']]['nombre_servicio']='<a  href="#"><i class="fa fa-angle-right"></i><span class="submenu-title">'.$row['nombre_servicio'].'</span><span class="fa arrow"></span></a>';
					$servicios[$row['cod_modulo']][$row['cod_servicio']]['abre_ul_servicio']='<ul class="nav nav-third-level" >';
					$servicios[$row['cod_modulo']][$row['cod_servicio']]['cierra_ul_servicio']='</ul>';
					$servicios[$row['cod_modulo']][$row['cod_servicio']]['cierra_li_servicio']='</li>';
					$vistas[$row['cod_modulo']][$row['cod_servicio']][$row['cod_vista_sistema']]['todo']='<li><a '.($row['tipo_apertura'] ? 'target="_blank"' : '').' href="?'.codificar('vista='.$row['nombre']).'" >'.$row['descripcion'].'</a></li>';

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
function cajas_estadisticas(){
	require_once("modelo/class_envio_entrenamiento.php");
	require_once("modelo/class_concurso.php");
	require_once("modelo/class_problema.php");
	require_once("modelo/class_usuario.php");
	$concurso 			 = new concurso;
	$envio_entrenamiento = new envio_entrenamiento;
	$problema = new problema;
	$usuario = new usuario;
	$total_concurso		 =$concurso->listar();
	$total_envio_entrenamiento=$envio_entrenamiento->listar_envio_entrenamiento();
	$total_problema	=$problema->listar();
	$total_usuario=$usuario->listar();
	
	$html.='
	                        <div class="col-sm-6 col-md-3">
                            <div class="panel profit db mbm">
                                <div class="panel-body"><p class="icon"><i class="icon fa fa-check"></i></p><h4 class="value"><span >'.$total_envio_entrenamiento.'</span></h4>

                                    <p class="description">Envios</p>

                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-3">
                            <div class="panel income db mbm">
                                <div class="panel-body"><p class="icon"><i class="icon fa fa-trophy"></i></p><h4 class="value"><span>'.$total_concurso.'</span></h4>

                                    <p class="description">Concursos</p>

                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-3">
                            <div class="panel task db mbm">
                                <div class="panel-body"><p class="icon"><i class="icon fa fa-keyboard-o"></i></p><h4 class="value"><span>'.$total_problema.'</span></h4>

                                    <p class="description">Problemas</p>

                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-3">
                            <div class="panel visit db mbm">
                                <div class="panel-body"><p class="icon"><i class="icon fa fa-group"></i></p><h4 class="value"><span>'.$total_usuario.'</span></h4>

                                    <p class="description">Usuarios</p>
                                </div>
                            </div>
                        </div>';
                        return $html;
	}
function formulario_login(){
		$html.='<div class="input-group" style="width:100%">
						<input type="hidden" name="nacionalidad" id="nacionalidad" value="V">
						<div class="input-group-btn" style="width:40px">
							<button style="border-top-right-radius:0px; border-bottom-right-radius:0px; border-right:0px"  type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span id="button_nacionalidad">V</span> <span class="caret"></span></button>
						    <ul class="dropdown-menu" role="menu">
								<li><a href="#"  onclick="return cambiar_rif_combo_usuario(\'V\')">V </a></li>
								<li><a href="#" onclick="return cambiar_rif_combo_usuario(\'E\')">E </a></li>
							</ul>
						</div>
				  <input name="cedula" required pattern="^[0-9]+$" title="Solo debe escribir numeros" type="text" onkeyup="this.value=this.value.toUpperCase()" placeholder="Usuario" class="form-control">
				  </div>
				</div>
				<div class="form-group">
				  <input required name="clave" type="password" placeholder="Clave" title="Introdusca su clave" class="form-control">
				</div>
				
				<button type="submit" name="evento" value="acceder" class="btn btn-primary">Acceder</button>
				';
		return $html;
}
function timeline_concursos(){
	require_once("modelo/class_concurso.php");
	$concurso = new concurso;
	$concurso->listar();
	while($row_concurso = $concurso->row()){
		 $html_concurso.=' <article class="timeline-entry">
                                    <div class="timeline-entry-inner">
                                        <time datetime="2014-01-10T03:45" class="timeline-time"><span>'.date('h:i:s',strtotime($row_concurso['tiempo_inicio'])).'</span><span>'.date('d-m-Y',strtotime($row_concurso['tiempo_inicio'])).'</span></time>
                                        <div class="timeline-icon bg-blue"><p class="icon"><i class="icon fa fa-trophy"></i></p></div>
                                        <div class="timeline-label bg-blue"><h4 class="timeline-title">'.$row_concurso['nombre_corto'].'</h4>

                                            <p>'.$row_concurso['nombre'].'</p></div>
                                    </div>
                                </article>';
		}
	$html.='
	
   
	                            <div class="timeline-centered timeline-sm" style="background:#F6F6F6">
													<div class="page-title-breadcrumb ">
												<div class="page-header pull-left">
													<h4 class="mbs">Concursos</h4>
												</div>
												<div class="clearfix"></div>
											</div>
	                           <br>

                                '.$html_concurso.'
                            </div>
       
                        ';
	return $html;
}

function estadisticas_lenguajes(){
	require_once("modelo/class_envio_entrenamiento.php");
	$envio = new envio_entrenamiento;
	if($envio->uso_lenguaje_prog()>0){
		while($row=$envio->row()){
			$html_interno.='<span>'.$row['nombre'].' <small class="pull-right text-muted">'.$row['porcentaje'].'%</small>
			<div class="progress progress-sm">
				<div role="progressbar" aria-valuenow="'.$row['porcentaje'].'" aria-valuemin="0" aria-valuemax="100" style="width: '.$row['porcentaje'].'%;" class="progress-bar progress-bar-orange"><span class="sr-only">40% Complete (success)</span>
				</div>
			</div>
			</span>';
			}
		}
		$html.='  <div class="panel">
                                <div class="panel-body">
                                    <div class="row">

                                        <div class="col-md-12">
                                        										<h4 class="mbs">Lenguajes de Programación</h4>
										<p class="help-block">Estadisticas de los lenguajes mas usados por los usuarios...</p>
											<h4 class="mbm">Lenguaje</h4>
											'.$html_interno.'</div>
                                    </div>
                                </div>
                            </div>
                            
								';
           return $html;
	
}
?>
