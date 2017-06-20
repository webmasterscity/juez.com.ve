<?php
	require_once("modelo/class_db.php");
	$db = new db;
	$evento = 	($_POST['evento'] ? $_POST['evento'] : $_GET['evento']);
	$tema = 	$_POST['tema'];
if($tema!='')
switch($evento){
	case "modificar":{
		$r=$db->ejecutar("UPDATE usuario_estilo SET tema='".$tema."' WHERE cod_usuario=".$_SESSION['cod_usuario']);
		if($r==1){
			$_SESSION['msj']='Tema cambiado correctamente.';
			$_SESSION['msj_tipo']='success';
			$_SESSION['tema']=$tema;
		}else{
			$_SESSION['msj']='Sin cambios';
			$_SESSION['msj_tipo']='warning';			
			}
		}
	break;
	
	}
else{
			$_SESSION['msj']='Por favor elija un tema';
			$_SESSION['msj_tipo']='danger';
		}
$db->ejecutar("SELECT * FROM usuario_estilo WHERE cod_usuario=".$_SESSION['cod_usuario']);
$row=$db->row();
$tema=$row['tema'];
		
		
?>
