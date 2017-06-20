<?php
ini_set('display_errors','ON');
error_reporting(E_ALL ^E_NOTICE ^E_DEPRECATED);
session_start();
date_default_timezone_set("America/Manaus"); 
//echo date('h:i:s',time());
//echo phpinfo();
//header("Expires: Sat, 26 Jul 2018 05:00:00 GMT");
//$_SESSION['cod_tipo_usuario']="";
//INCLUYE FUNCIONES GENERALES QUE SE PUEDEN UTILIZAR EN DISTINTAS PARTES DEL SISTEMA

require_once("libreria/funciones_generales.php");

verifica_problemas();
require_once("libreria/funciones_generales_concurso.php");

//verificar_ip();
//verificar_actualizar_datos_personales();
verificar_notificaciones();

if($_SESSION['cod_usuario']){
//verificar_inactividad();
//verificar_caducidad();
	
}

//ARCHIVO PRINCIPAL A CARGAR CUANDO SE ABRE LA PAGINA
$principal 			="principal";
//SANEAMOS EL METODO GET PARA EVITAR ATAQUES DE INJECCION SQL
decodificar_url();

$vista				=$_GET['vista'];
#echo "VISTA".$vista;
//DETECTAMOS EL USUARIO QUE ESTA ENTRANDO A LA PAGINA
$cod_tipo_usuario	=$_SESSION['cod_tipo_usuario'];
//EN CASO QUE EL USUARIO NO EXISTA O NO ESTE LOGUEADO ASIGNAMOS UN USUARIO POR DEFECTO
if(!$cod_tipo_usuario || !$_SESSION['vista_intranet']){
	
	$_SESSION['cod_tipo_usuario']=1;
	generar_privilegios(1);
}
//generar_privilegios(1);
//VERIFICAMOS SI EL USUARIO TIENE ACCESO A LA VISTA EN CASO CONTRARIO LO DEVOLVEMOS A LA PAGINA PRINCIPAL
if($vista){
	
	if($_SESSION['vista_'.$vista]!=true){
		$_SESSION['msj_tipo']='warning';
		$_SESSION['msj']='Estimado usuario, usted no tiene acceso a esta pagina, por favor contacte al administrador de nuestro sitio web.';
		$vista=$principal;
	}
}else{
		$vista=$principal;
	}

if(!$_GET['vista'] and !$_SESSION['login']){
	$vista="principal";	
}elseif(!$_GET['vista'] and $_SESSION['login']){
	$vista="intranet";
}
//INCLUIMOS EL CONTROLADOR DE LA PAGINA SOLICITADA

if(file_exists("control/control_".$vista.".php")){
	$titulo_arriba= titulo_arriba($vista); 
include_once("control/control_".$vista.".php");
}
verificar_clave_default();
//INCLUIMOS LA CABEZERA DE LA PAGINA

//EN CASO DE QUE EXISTA UNA REDIRECCION ESTE CODIGO REDIRECCIONA
if($_SESSION['redireccion']){
	$redi=$_SESSION['redireccion'];
	$_SESSION['redireccion']="";
	exit('<script> window.location.href="'.$redi.'"; </script>');
}


//AGREGAMOS LA VISTA

if(!file_exists("vista/".$vista.".php")){
	echo '<div style="text-align:center"><img src="images/construccion.fw.png"></div>';
}else{
	require_once("vista/header_nuevo.php");
	//EN CASO DE QUE EXISTA UN MSJ ESTE CODIGO MUESTRA LOS MENSAJES
	
	echo $titulo_arriba; 
	echo mostrar_msj();
	//echo $_SESSION['nombre_vista'];
	//echo $vista;
	require_once("vista/".$vista.".php");
	echo $html_todo;
	//AGREGAMOS EL PIE DE PAGINA
	require_once("vista/footer_nuevo.php");
}




?>

<script>

/*
function nobackbutton(){
   window.location.hash="no-back-button";
   window.location.hash="Again-No-back-button" //chrome
   window.onhashchange=function(){window.location.hash="no-back-button";}
}
onload=function(){
	nobackbutton();
}
*/
</script>




