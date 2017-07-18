<?php
	//INCLUIMOS LAS CLASES
	require_once("vista/cambio_rol.php");
	$dato_personal = new vista_cambio_rol;
	
	//METODOS DE ENTRADA
	$evento = 	($_POST['evento'] ? $_POST['evento'] : $_GET['evento']);
	$cedula=$_SESSION['cedula'];
	$cod=$_GET['cod'];
	$nombre		=$_POST["nombre"];
	$cod_tipo_usuario=$_SESSION["cod_tipo_usuario"];
	$apellido	=$_POST["apellido"];
	$sexo		=$_POST["sexo"];
	$correo		=$_POST["correo"];
	$telefono_movil=$_POST["telefono_movil"];
	$telefono_fijo=$_POST["telefono_fijo"];
	$fecha_nacimiento=$_POST["fecha_nacimiento"];
	$direccion	=$_POST['direccion'];
	$clave		=$_POST["clave"];
	$estatus	=$_POST["estatus"];
	$volver		=$_POST["volver"];
	$captcha	=$_POST['captcha'];
	$pregunta	=$_POST['pregunta'];
	$respuesta	=$_POST['respuesta'];
	$cod_parroquia=$_POST['cod_parroquia'];
	$foto_perfil=$_FILES['foto_perfil'];
	
	$cod_usuario= $cod ? $cod : $_SESSION['cod_usuario'];
	
	$dato_personal->set_cedula($cedula);
	$dato_personal->set_nombre($nombre);
	$dato_personal->set_apellido($apellido);
	$dato_personal->set_sexo($sexo);
	$dato_personal->set_fecha_nacimiento($fecha_nacimiento);
	$dato_personal->set_correo($correo);
	$dato_personal->set_telefono_movil($telefono_movil);
	$dato_personal->set_telefono_fijo($telefono_fijo);
	$dato_personal->set_cod_parroquia($cod_parroquia);
	$dato_personal->set_direccion($direccion);
	$dato_personal->set_cod_usuario($cod_usuario);
	$dato_personal->set_foto_perfil($foto_perfil);
	
	//INSTANCIAMOS EL OBJETO Y APLICAMOS LOS METODOS SET
	
	//MANEJADOR DE EVENTOS
	switch($evento){
			case 'guardar_soli':{
			@include_once('modelo/class_cambiar_rol.php');
			$cambiar= new cambio_rol();

			
			$cambiar->set_cod_usuario($_SESSION['cod_usuario']); 
			$cambiar->set_cod_cambio($_POST['cod_cambiar']); 
			$cambiar->set_motivo($_POST['motivo']); 
			
			$cambiar->set_estatus(1); 
			$cambiar->set_cod_rol($_POST['cod_tipo_usuario']); 

			//datos del arhivo
			 $nombre_archivo = $_FILES['documento']['name'];
			//echo '####'.$_FILES['documento']['name'].'***';
			$tipo_archivo = $_FILES['documento']['type'];


			//echo 'tipo -> '.$tipo_archivo; exit();

			if($tipo_archivo == 'image/jpeg'){

			$tamano_archivo = $_FILES['documento']['size'];
			
			$nuevo=explode('.',$nombre_archivo); 
			$nom_documento=$_SESSION['cod_usuario'].'_'.$_POST['cod_tipo_usuario'].'_'.date('Y').'.'.$nuevo[1];

			$cambiar->set_documento($nom_documento); 
			$rutas='archivos/cambio_rol/';
			move_uploaded_file($_FILES['documento']['tmp_name'], $rutas.$nombre_archivo);

			rename ($rutas.$nombre_archivo, $rutas.$nom_documento);
			//chmod("archivos/cambio_rol/", 0777); 

			$cambiar->registrar(); 
			$mensaje=strtoupper('Se esta evaluando su solicitud de cambio de rol ');
			$url='#'; $observacion='';
			registrar_notificacion($mensaje,$url,$_SESSION['cod_usuario'],$observacion);

			$_SESSION['msj']='Solicitud enviada correctamente';
			$_SESSION['msj_tipo']='success';
				$html_todo=$dato_personal->cambiar_rol();
		}else{

			$_SESSION['msj']='Error: formato no permitido solo se permite formato jpg';
			$_SESSION['msj_tipo']='danger';
				$html_todo=$dato_personal->cambiar_rol();
		}


			
		}
		break;
		case 'modificar':{
			@include_once('modelo/class_cambiar_rol.php');
			$cambiar= new cambio_rol();
			$cambio= new cambio_rol();


			$sql_elimina="delete from solicitud_cambio_rol where cod_cambio='".$_POST['codigo_coli']."' ";

			$cambio->ejecutar($sql_elimina,'c');
			
			$cambiar->set_cod_usuario($_SESSION['cod_usuario']); 
			$cambiar->set_cod_cambio($_POST['cod_cambiar']); 
			$cambiar->set_motivo($_POST['motivo']); 
			
			$cambiar->set_estatus(1); 
			$cambiar->set_cod_rol($_POST['cod_tipo_usuario']); 

			//datos del arhivo
			 $nombre_archivo = $_FILES['documento']['name'];
			//echo '####'.$_FILES['documento']['name'].'***';
			$tipo_archivo = $_FILES['documento']['type'];
			$tamano_archivo = $_FILES['documento']['size'];

			if($tipo_archivo == 'image/jpeg'){
			
				$nuevo=explode('.',$nombre_archivo); 
				$nom_documento=$_SESSION['cod_usuario'].'_'.$_POST['cod_tipo_usuario'].'_'.date('Y').'.'.$nuevo[1];

				$cambiar->set_documento($nom_documento); 
				$rutas='archivos/cambio_rol/';
				move_uploaded_file($_FILES['documento']['tmp_name'], $rutas.$nombre_archivo);

				rename ($rutas.$nombre_archivo, $rutas.$nom_documento);
				//chmod("archivos/cambio_rol/", 0777); 


				$cambiar->registrar(); 
				$mensaje=strtoupper('Se esta evaluando su solicitud de cambio de rol ');
				$url='#'; $observacion='';
				registrar_notificacion($mensaje,$url,$_SESSION['cod_usuario'],$observacion);

				$_SESSION['msj']='Solicitud enviada correctamente';
				$_SESSION['msj_tipo']='success';
				$html_todo=$dato_personal->cambiar_rol();
			}else{

				$_SESSION['msj']='Error: formato no permitido, solo se permite imagenes JPG.';
				$_SESSION['msj_tipo']='danger';
					$html_todo=$dato_personal->cambiar_rol();
		}
		}
		break;
		default:{
			$html_todo=$dato_personal->cambiar_rol();
		}
	}
?>
		
