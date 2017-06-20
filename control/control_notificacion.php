<?php

require_once("modelo/class_notificacion.php");

$notificacion = new notificacion;
$evento = ($_POST['evento'] ? $_POST['evento'] : $_GET['evento']);
$cod_notificacion=$_REQUEST['cod_notificacion'];
$notificacion->set_cod_usuario($_SESSION['cod_usuario']);
switch($evento){
	case "eliminar":{
		$notificacion->set_cod_notificacion($cod_notificacion);
		$notificacion->eliminar();
		//ddfdfd
		
	}
	default:{
		$notificacion->set_cod_usuario($_SESSION['cod_usuario']);
		
		if($notificacion->consulta_por('cod_usuario')>0){
			while($row_notificacion=$notificacion->row()){
				$tr.='<tr '.($row_notificacion['estatus']==0 ? 'class="success"' : '').' ><td>'.$row_notificacion['fecha'].'</td><td>'.ucwords(strtolower($row_notificacion['mensaje'])).'</td><td><a href="?'.codificar('vista=notificacion&cod_notificacion='.$row_notificacion['cod_notificacion'].'&evento=eliminar').'" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></a></td></tr>';
				}
				
		}else{
			$tr.='<tr><td colspan="3" style="text-align:center">Actualmente no tiene notificaciones.</td></tr>';	
		}
			$html.='<table class="table table-striped"><tr><td>Fecha y hora</td><td>Mensaje</td><td></td></tr>'.$tr.'</table>';
		
		}
		$notificacion->visto();
	
	
	}
?>
