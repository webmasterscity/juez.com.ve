<?php
	//INCLUIMOS LAS CLASES
	
	require_once("vista/listado_soli_rol.php");
	//METODOS DE ENTRADA


	$evento = 	($_POST['evento'] ? $_POST['evento'] : $_GET['evento']);
	
	//INSTANCIAMOS EL OBJETO Y APLICAMOS LOS METODOS SET
	
			$solicitud_cambio_rol = new vista_listado_soli_rol();
			$solicitud_cambio_rol->set_cod_usuario($_SESSION['cod_usuario']); 
			$solicitud_cambio_rol->set_cod_cambio($_POST['cod_cambio']); 
			$solicitud_cambio_rol->set_motivo($_POST['motivo']); 
			$solicitud_cambio_rol->set_documento($_FILES['documento']); 
			$solicitud_cambio_rol->set_estatus(1); 
			$solicitud_cambio_rol->set_cod_rol($_POST['cod_tipo_usuario']); 	
		
	//MANEJADOR DE EVENTOS
	switch($evento){
		case 'reporte_html_individual':{
			$solicitud_cambio_rol->registrar_bitacora("Consulta detallada","solicitud cambio de roles");
			//$html_todo=$solicitud_cambio_rol->reporte_html_individual();
			
			}
		break;
		case 'formulario_modificar':{
			$html_todo=$solicitud_cambio_rol->formulario('modificar');
			}
		break;
		case 'formulario_registrar':{
			//$html_todo=$solicitud_cambio_rol->formulario('registrar');
		}
		break;
		case 'registrar':{
			/*
			if($solicitud_cambio_rol->registrar()==1){	
				$_SESSION['msj']='Registrado correctamente';
				$_SESSION['msj_tipo']='success';
				$solicitud_cambio_rol->registrar_bitacora("Registro","lenguajes de programación con Nro. Unico: ".$solicitud_cambio_rol->ultimo_id());
				$solicitud_cambio_rol = new solicitud_cambio_rol;
			}
			
			$html_todo=$solicitud_cambio_rol->formulario('registrar'); */
		}
		break;
		case 'aprobar':{



			$solicitud_cambio_rol->set_cod_cambio($_POST['cod_cambio']); 
			$solicitud_cambio_rol->operacion(2,$_POST['observa']);
			$solicitud_cambio_rol->registrar_bitacora("Aprobo","El cambio de rol al usuario :".$_POST['dato'].' ha: '.$_POST['rol']);

			$mensaje=strtoupper('Ha sido Aprobada su solicitud de Cambio de rol ha : '.$_POST['rol'].' Obsv: '.$_POST['observa']);
			$url='#'; $observacion='';
			registrar_notificacion($mensaje,$url,$_POST['usu'],$observacion);
			$sql="update usuario set cod_tipo_usuario='".$_POST['cod_rol']."' "; $solicitud_cambio_rol->ejecutar($sql);

				$_SESSION['msj']='Correcto';
				$_SESSION['msj_tipo']='success';
				$html_todo=$solicitud_cambio_rol->reporte_html_general($vista);
		}
		break;
		case 'denegar':{
			$solicitud_cambio_rol->set_cod_cambio($_POST['cod_cambio']); 
			$solicitud_cambio_rol->operacion(3,$_POST['observa']);
			$solicitud_cambio_rol->registrar_bitacora("Denego","El cambio de rol al usuario :".$_POST['dato'].' ha: '.$_POST['rol']);

			$mensaje=strtoupper('Ha sido Rechazada su solicitud de Cambio de rol ha : '.$_POST['rol'].' Obsv: '.$_POST['observa']);
			$url='#'; $observacion='';
			registrar_notificacion($mensaje,$url,$_POST['usu'],$observacion);



				$_SESSION['msj']='Correcto';
				$_SESSION['msj_tipo']='success';
				$html_todo=$solicitud_cambio_rol->reporte_html_general($vista);
		}
		break;
		case 'activar':{
			/*
			if($solicitud_cambio_rol->activar()==1){
				$_SESSION['msj']='Registro activado';
				$_SESSION['msj_tipo']='warning';
				$solicitud_cambio_rol->registrar_bitacora("Activo","lenguajes de programación Nro. ".$cod_lenguaje_prog);
			}
			$html_todo=$solicitud_cambio_rol->reporte_html_general($vista); */
		}
		break;
		case 'eliminar':{
			/*
			if($solicitud_cambio_rol->eliminar()==1){
				$_SESSION['msj']='Eliminado correctamente.';
				$_SESSION['msj_tipo']='success';
				$solicitud_cambio_rol->registrar_bitacora("Elimino","lenguajes de programación Nro. ".$cod_lenguaje_prog);
			}
			$html_todo=$solicitud_cambio_rol->reporte_html_general($vista); */
		}
		break;
		default:{
		
			$solicitud_cambio_rol->registrar_bitacora("Listo","Solicitudes de Cambio de roles");
			$html_todo=$solicitud_cambio_rol->reporte_html_general($vista);
			
		}
		break;
	};
		?>
		
