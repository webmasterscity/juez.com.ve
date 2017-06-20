<?php
//FUNCION QUE GENERA LOS PRIVILEGIOS DEL USUARIO
function generar_privilegios($cod_tipo_usuario){
	   
		require_once("modelo/class_usuario.php");
		$usuario = new usuario;
		$usuario->set_cod_tipo_usuario($cod_tipo_usuario);
		$a=$usuario->privilegios();
		$_SESSION['vista_mision']=true;
		$_SESSION['vista_vision']=true;
		$_SESSION['vista_resena']=true;
		while($row_usuario = $usuario->row()){
			
			$nombre=$row_usuario['nombre'];
			$nombre=explode('&',$nombre);
			
			$_SESSION['vista_'.$nombre[0]]=true;
			$_SESSION['cod_vista_'.$nombre[0]]=$row_usuario['cod_vista_sistema'];
			
		}

			
}

function consultar_inactividad(){
	$tiempo_de_expiracion=tiempo_inactividad();
	require_once("modelo/class_usuario.php");
	$usuario = new usuario;
		
		$usuario->set_cod_usuario($_SESSION['cod_usuario']);
		if($usuario->consultar()>0){			
			$fecha_hora_vieja=date('Y-m-d h:i:s a', strtotime($usuario->ultima_actividad." +".$tiempo_de_expiracion." minute"));
			$fecha_hora_actual=date('Y-m-d h:i:s a', strtotime("now"));
			//exit($fecha_hora_vieja."s".$fecha_hora_actual);
			$datetime1 = new DateTime($fecha_hora_vieja);
			$datetime2 = new DateTime($fecha_hora_actual);
			if($datetime1 < $datetime2){
				return 1;
			}else{
				$usuario->actualizar_entrada();
			}
		}	
	
}
function consultar_inactividad_control_ajax(){
		require_once("../modelo/class_db.php");
		$db = new db;
		$db->ejecutar("SELECT * FROM configurar");
		$row=$db->row();
		$tiempo_de_expiracion=$row['inactividad'];
		$res=$db->ejecutar("SELECT usuario.*, tipo_usuario.nombre as nombre_tipo_usuario, persona.*, date_format(persona.fecha_nacimiento,'%d-%m-%Y') as fecha_nacimiento, date_format(usuario.ultima_actividad,'%d-%m-%Y %h:%i:%s %p') as ultima_actividad, municipio.nombre as nombre_municipio, parroquia.nombre as nombre_parroquia, estado.nombre as nombre_estado FROM usuario INNER JOIN persona ON persona.cedula=usuario.cedula INNER JOIN parroquia ON persona.cod_parroquia=parroquia.cod_parroquia INNER JOIN municipio ON municipio.cod_municipio=parroquia.cod_municipio INNER JOIN estado ON estado.cod_estado=municipio.cod_estado INNER JOIN tipo_usuario ON tipo_usuario.cod_tipo_usuario=usuario.cod_tipo_usuario WHERE cod_usuario='".$_SESSION['cod_usuario']."'");
		$row=$db->row();
		if($res>0){			
			$fecha_hora_vieja=date('Y-m-d h:i:s a', strtotime($row['ultima_actividad']." +".$tiempo_de_expiracion." minute"));
			$fecha_hora_actual=date('Y-m-d h:i:s a', strtotime("now"));
			//exit($fecha_hora_vieja."s".$fecha_hora_actual);
			$datetime1 = new DateTime($fecha_hora_vieja);
			$datetime2 = new DateTime($fecha_hora_actual);
			if($datetime1 < $datetime2){
				return 1;
			}
		}	
	
}

function verificar_inactividad(){
	if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
		
		
	}else{
		if(consultar_inactividad()==1){
			session_start();
			session_unset();
			session_destroy();
			$_SESSION[]=array();
			session_start();
			$_SESSION['msj_tipo']='danger';
			$_SESSION['msj']='Disculpe, por razones de seguridad su sesión fue cerrada, intente de nuevo.';
			header("location:index.php");
			exit();		
		}
	}
	
}

function verificar_preguntas_seguridad(){
	require_once("modelo/class_pregunta_seguridad.php");
	$pregunta_seguridad = new pregunta_seguridad;
	if($_SESSION['cod_usuario']){
		$pregunta_seguridad->set_cedula($_SESSION['cedula']);
		if($pregunta_seguridad->consultar()==0){
				$_SESSION['redireccion']='index.php?'.codificar('vista=pregunta_seguridad');
				$_SESSION['msj_tipo']="info";
				$_SESSION['msj']="Por favor establesca sus preguntas de seguridad.";
				
		}
	}	
	
}

function verificar_caducidad(){
	require_once("modelo/class_usuario.php");
	$usuario = new usuario;
	if($_SESSION['cod_usuario']){
		$usuario->set_cod_usuario($_SESSION['cod_usuario']);
		if($usuario->consultar()>0){
			$row=$usuario->row();
			$fecha_clave=$usuario->fecha_clave;
			$clave		=$usuario->clave;
			$fecha_hora_actual=date("Y-m-d");
			$dias=dias_transcurridos($fecha_clave,$fecha_hora_actual);
			
			$dias_vencer=dias_vencer();
			$dias_restantes=$dias_vencer-$dias;
			//exit('Transcurrido: '.$dias.', Restante:'.$dias_restantes);
			if($dias>=$dias_vencer){
				if($_GET['vista']!='cambiar_pass'){
					$_SESSION['redireccion']='index.php?'.codificar('vista=cambiar_pass');
					$_SESSION['msj_tipo']='danger';
					$_SESSION['msj']='Estimado usuario su contraseña ha vencido, por favor cambiela inmediatamente.';
				}
				
			}elseif($dias_restantes<4){
				
				$mensaje="Estimado usuario su contraseña vence en ".$dias_restantes." dias, le recomendamos cambiarla inmediatamente.";
				$url="cambiar_pass";
				$cod_usuario=$_SESSION['cod_usuario'];
				$observacion=$clave;
				//registrar_notificacion($mensaje,$url,$cod_usuario,$observacion);
			}
		}
	}
}
function verificar_clave_default(){
	require_once("modelo/class_usuario.php");
	$usuario = new usuario;
	if($_SESSION['cod_usuario']){
		
		$usuario->set_cod_usuario($_SESSION['cod_usuario']);
		if($usuario->consultar()>0){

			$fecha_clave=$usuario->fecha_clave;
			$clave=$usuario->clave;
			$fecha_hora_actual=date("Y-m-d");
			if(is_numeric($clave)){
				if($_GET['vista']!='cambiar_pass'){
					$_SESSION['redireccion']='index.php?'.codificar('vista=cambiar_pass');
					$_SESSION['msj_tipo']='danger';
					$_SESSION['msj']='Estimado usuario por medidas de seguridad por favor cambie su clave.';
				}
				
			}
		}
	}
}

function verificar_notificaciones(){
		require_once("modelo/class_notificacion.php");
		$notificacion=new notificacion;
		//echo '###'.$_SESSION['cod_usuario']; exit();
		$notificacion->set_cod_usuario($_SESSION['cod_usuario']);
		return $notificacion->verificar();
	
}
function registrar_notificacion($mensaje,$url,$cod_usuario,$observacion){
		require_once("modelo/class_notificacion.php");
		$notificacion=new notificacion;
		$notificacion->set_mensaje($mensaje);
		$notificacion->set_url($url);
		$notificacion->set_cod_usuario($cod_usuario);
		$notificacion->set_observacion($observacion);
		$notificacion->set_estatus(0);
		$notificacion->set_fecha_comparar(date('d-m-Y'));
		if($notificacion->consulta_repetido()==0){
			if($notificacion->no_repetir()==0){
				$notificacion->registrar();
			}
		}
}


function dias_vencer(){
		require_once("modelo/class_configurar.php");
		$configurar= new configurar;
		$configurar->consultar();
		$row=$configurar->row();
		return $row['caducidad'];
	
}
function tiempo_inactividad(){
		require_once("modelo/class_configurar.php");
		$configurar= new configurar;
		$configurar->consultar();
		$row=$configurar->row();
		return $row['inactividad'];
	
}

function dias_transcurridos($fecha_i,$fecha_f){
	$dias	= (strtotime($fecha_i)-strtotime($fecha_f))/86400;
	$dias 	= abs($dias); $dias = floor($dias);		
	return $dias;
}

function actualizar_ultima_actividad(){
	require_once("modelo/class_usuario.php");
	$usuario = new usuario;
	if($_SESSION['cedula']){
		$usuario->set_cedula($_SESSION['cedula']);
		$usuario->actualizar_entrada();
		}
	}
function getUserIP()
{
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];

    if(filter_var($client, FILTER_VALIDATE_IP))
    {
        $ip = $client;
    }
    elseif(filter_var($forward, FILTER_VALIDATE_IP))
    {
        $ip = $forward;
    }
    else
    {
        $ip = $remote;
    }

    return $ip;
}

function verificar_ip(){
	$ip=getUserIP();
	require_once("modelo/class_bloqueo_ip.php");
	$bloqueo_ip = new bloqueo_ip;
	$bloqueo_ip->set_ip($ip);
	if($bloqueo_ip->consultar()>0){
	exit("<script>alert('Estimado usuario, ha ocurrido un error en el sistema comuniquese con el administrador a traves del siguiente correo: ds000082@gmail.com')</script> <style> body {background-image:url('images/fondo.jpg'); background-repeat: no-repeat; background-size:100% }</style>");	
	}
}
function bloquear_ip(){
	require_once("modelo/class_bloqueo_ip.php");
	$bloqueo_ip = new bloqueo_ip;
	$bloqueo_ip->set_ip(getUserIP());
	$bloqueo_ip->set_agente($_SERVER['HTTP_USER_AGENT']);
	if($bloqueo_ip->consultar()==0){
		$bloqueo_ip->registrar();	
	}
}
function bloquear_usuario($cedula){
	require_once("modelo/class_usuario.php");
	$usuario= new usuario;
	$usuario->set_cedula($cedula);
	$usuario->bloquear_usuario();
}
function verificar_intentos_fallidos($cedula){
		session_start();
		require_once("modelo/class_configurar.php");
		$configurar = new configurar;
		$configurar->consultar();
		$row_configurar=$configurar->row();	
		
	if($_SESSION['intentos']>=$row_configurar['intentos_fallidos']){
		
		$_SESSION['msj_tipo']="danger";
		$_SESSION['msj']="Usuario Inactivo ó Bloqueado, Por favor contacte el administrador.";
		bloquear_usuario($cedula);
		header("location:index.php");
		$_SESSION['intentos']=0;
		exit();
	}
	return $row_configurar['intentos_fallidos']-$_SESSION['intentos'];
}

if($_SERVER['HTTP_USER_AGENT']=='Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; Netsparker)'){
	
	bloquear_ip();
	
}

function btn_eliminar_desactivar($estatus){
	if($estatus==1){
		return '<button type="submit" name="evento" value="eliminar" title="Eliminar" class="btn btn-danger btn-sm" onclick="return msj_eliminar()"><span class="glyphicon glyphicon-trash"></span></button>';
	}else{
		
		return '<button type="submit" name="evento" value="eliminar" title="Activar" class="btn btn-info btn-sm" ><span class="glyphicon glyphicon-font"></span></button>';
	}
}


function lemez_combo($id_combo,$value,$texto){
	
	echo '
	<script>
		function lemez_combo(id_combo,value,texto){
				select=opener.document.getElementById(id_combo,value,texto);
				cantidad_actual=select.options.length;
				select.options[cantidad_actual]= new Option(texto,value);
				select.selectedIndex=cantidad_actual;
				window.close();
		}
		lemez_combo("'.$id_combo.'","'.$value.'","'.$texto.'");
	</script>
	';
}
function mostrar_privilegios($cod_tipo_usuario,$vista){
	$cod_vista_sistema=$_SESSION['cod_vista_'.$vista];
	require_once('modelo/class_privilegio.php');
	$privilegio = new privilegio;
	$privilegio->set_cod_tipo_usuario($cod_tipo_usuario);
	$privilegio->set_cod_vista_sistema($cod_vista_sistema);
	$o=$privilegio->consulta_doble('cod_tipo_usuario','cod_vista_sistema');
	
	return $privilegio->row();	
}

function mostrar_btn($cod_tipo_usuario,$vista,$parametro){
		$tipo=$parametro['tipo'];
		$cod_usuario_reg=$parametro['cod_usuario_reg'];
		$row_privilegio=mostrar_privilegios($cod_tipo_usuario,$vista);
		
		switch($tipo){
			case 'botonera':{
				if($row_privilegio['consultar']){
					$html.='
					<button  type="submit" name="evento" value="reporte_html_individual" title="Consultar" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-search"></span></button>';
				}
				if($row_privilegio['actualizar'] || $cod_usuario_reg==$_SESSION['cod_usuario']){
					$html.='
					<button  type="submit" name="evento" value="formulario_modificar" title="Modificar" class="btn btn-success btn-xs"><span class="glyphicon glyphicon-edit"></span></button>';
				}
				if($row_privilegio['desactivar'] || $cod_usuario_reg==$_SESSION['cod_usuario']){
					if($parametro['estatus']=='1')
						$html.=' <button type="submit" name="evento" value="desactivar" title="Desactivar" class="btn btn-warning btn-xs" ><span class="glyphicon glyphicon-ban-circle"></span></button>
						
						';
					else
						$html.=' <button type="submit" name="evento" value="activar" title="Activar" class="btn btn-info btn-xs btn_status_desactivo" ><span class="glyphicon glyphicon-ok"></span></button>';

				}
				if($row_privilegio['eliminar']){
					$html.='
					<button type="submit" name="evento" value="eliminar" title="Eliminar" class="btn btn-danger btn-xs" onclick="return msj_eliminar()"><span class="glyphicon glyphicon-remove"></span></button>';
				}				
			}
			break;
			case 'consulta_nuevo':{
				if($row_privilegio['registrar']){
					$html.='<a title="Agregar un nuevo registro" class="btn btn-success btn-sm" href="?'.codificar(decodificar($_SERVER['QUERY_STRING']).'&evento=formulario_registrar').'"><span class="glyphicon glyphicon-plus"></span></a>';
				}	
			}
			break;
			case 'consulta_modificar':{
				if($row_privilegio['actualizar']){
					$html.=botones('modificar');
				}	
			}
			break;
			case 'registrar':{
				if($row_privilegio['registrar']){
					$html.=botones('registrar');
				}	
			}
			break;
		}


	return $html;
}
function autorizar_si_registro($registrar){
	
}
function foto_perfil_peque($cedula){
	require_once("modelo/class_persona.php");
	$persona = new persona;
	$persona->set_cedula($cedula);
	$persona->consultar();
	if($persona->foto_perfil_peque){
		$foto=$persona->foto_perfil_peque;
	}else{
		
		$foto='chat/admin/images/img-no-avatar.gif';
		
	}
	return '<a href="?'.codificar('vista=dato_personal&evento=dato_personal_html').'"><img width="35px" src="'.$foto.'?leo='.rand(100,999).'" ></a>';
	
	
}

	function codificar($msj){
		# la clave debería ser binaria aleatoria, use scrypt, bcrypt o PBKDF2 para
		# convertir un string en una clave
		# la clave se especifica en formato hexadecimal
		$key = pack('H*', "6c656f6e6172646f206a65737573206d656c656e64657a2073756c626172616e");
	$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
		
		# mostrar el tamaño de la clave, use claves de 16, 24 o 32 bytes para AES-128, 192
		# y 256 respectivamente
		$key_size =  strlen($key);
		# crear una aleatoria IV para utilizarla co condificación CBC
		
		$iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
		
		# crea un texto cifrado compatible con AES (tamaño de bloque Rijndael = 128)
		# para hacer el texto confidencial 
		# solamente disponible para entradas codificadas que nunca finalizan con el
		# el valor  00h (debido al relleno con ceros)
		$msj = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key,
									 $msj, MCRYPT_MODE_CBC, $iv);

		# anteponer la IV para que esté disponible para el descifrado
		$msj = $iv . $msj;
		
		# codificar el texto cifrado resultante para que pueda ser representado por un string
		$ciphertext_base64 = base64_encode($msj);

		return  $ciphertext_base64;		
		}


	function calcular_edad($fecha){
		$dias = explode("-", $fecha, 3);
		$dias = mktime(0,0,0,$dias[1],$dias[0],$dias[2]);
		$edad = (int)((time()-$dias)/31556926 );
		return $edad;
	}
	function decodificar($msj){
		$key = pack('H*', "6c656f6e6172646f206a65737573206d656c656e64657a2073756c626172616e");
		$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
		$ciphertext_dec = base64_decode($msj);
		
		# recupera la IV, iv_size debería crearse usando mcrypt_get_iv_size()
		$iv_dec = substr($ciphertext_dec, 0, $iv_size);
		
		# recupera el texto cifrado (todo excepto el $iv_size en el frente)
		$ciphertext_dec = substr($ciphertext_dec, $iv_size);

		# podrían eliminarse los caracteres con valor 00h del final del texto puro
		$plaintext_dec = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key,
										$ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);
		
		return $plaintext_dec;
	}
	
	function decodificar_url(){
		if($_SERVER['QUERY_STRING']){
			$_GET=array();
			$url=decodificar($_SERVER['QUERY_STRING']);
			//echo $_SERVER['QUERY_STRING'].'<br>';
			$arreglo=explode('&',$url);
			foreach($arreglo as $var){
				$a=explode('=',trim($var));
				$_GET[$a[0]]=$a[1];				
				$_REQUEST[$a[0]]=$a[1];				
			}
			
			//echo $url.'<-aqui<br>';
			
			#Aqui generamos los metodos get a partir de una url decodificada
			//parse_str($url,$_GET);
			//echo $_GET['vista'];
			//print_r($_GET);
		
		}

	}

function titulo_arriba($vista){
	$cod_vista_sistema=$_SESSION['cod_vista_'.$vista];
	
	require_once("modelo/class_vista_sistema.php");
	$vista_sistema = new vista_sistema;
	$vista_sistema->set_cod_vista_sistema($cod_vista_sistema);
	$vista_sistema->consultar();
	$html.='  <div id="title-breadcrumb-option-demo" class="page-title-breadcrumb">
                <div class="page-header pull-left">
                    <div class="page-title">
						<a href="#">'.ucwords($vista_sistema->nombre_modulo).'</a>
					</div>
                </div>
                <ol class="breadcrumb page-breadcrumb pull-right">
                    <li><i class="fa fa-home"></i>&nbsp;<a href="index.php">Inicio</a>&nbsp;&nbsp;'.($vista_sistema->nombre_servicio ? '<i class="fa fa-angle-right"></i>&nbsp;&nbsp;' : '').'</li>
                    
                    <li>&nbsp;'.ucwords($vista_sistema->nombre_servicio).'&nbsp;&nbsp;</li>
                    
                </ol>
                <div class="clearfix"></div>
            </div>';
            $_SESSION['nombre_vista']=ucwords($vista_sistema->descripcion);
           
            return $html;
	
	}

function mostrar_msj(){
	
	if($_SESSION['msj']){

	echo '

	
		<div class="row">
			<div class="col-md-12">
				<div class="alert alert-'.$_SESSION['msj_tipo'].' alert-dismissable" style="margin-bottom:1px; margin-top:0px">
					<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
					<b>'.$_SESSION['msj'].'</b>
				</div>
			</div>
		</div>
	
 ';
	$_SESSION['msj']="";
	$_SESSION['msj_tipo']="";
}
	}
	
function mostrar_msj_nuevo(){
	
	if($_SESSION['msj']){

	echo '


	<script> 
toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "10000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}	
toastr["error"]("'.$_SESSION['msj'].'"); </script>

	
 ';
	$_SESSION['msj']="";
	$_SESSION['msj_tipo']="";
}
	}
function foto_perfil_peque_redonda($cedula){
	require_once("modelo/class_persona.php");
	$persona = new persona;
	$persona->set_cedula($cedula);
	$persona->consultar();
	if($persona->foto_perfil_peque){
		$foto=$persona->foto_perfil_peque;
	}else{
		
		$foto='chat/admin/images/img-no-avatar.gif';
		
	}
	
	return '<img src="'.$foto.'?leo='.rand(100,999).'" alt="" class="img-responsive img-circle"/>';
	
}

function botones($mostrar_btn){
$salida.='

	<div class="row">
		<div class="col-md-6  col-md-offset-3" style="text-align:center">
		';
		switch($mostrar_btn){
			case "registrar":{
			$salida.='
			<button onclick="return validar()" id="registrar" class="btn btn-primary btn-lg"  type="submit" name="evento" value="registrar">
				<span class="glyphicon glyphicon-floppy-disk" > </span>
				Registrar
			</button>';
			}
			break;
			case "modificar":{
			$salida.='
			<button onclick="return validar()" id="modificar" class="btn btn-primary btn-lg" type="submit" name="evento" value="modificar">
				<span class="glyphicon glyphicon-edit" > </span>
				Modificar
			</button>
			';
			}
			break;
			case "actualizar":{
			$salida.='
			<button onclick="return validar()" id="modificar" class="btn btn-primary btn-lg" type="submit" name="evento" value="modificar">
				<span class="glyphicon glyphicon-edit" > </span>
				Actualizar
			</button>
			';
			}
			break;
			case "editar_volver":{
			$salida.='
			<input type="hidden" name="volver" value="true">
			<button  onclick="return validar()" id="modificar" class="btn btn-p" type="submit" name="evento" value="editar">
				<span class="glyphicon glyphicon-edit" > </span>
				Editar
			</button>
			';
			}	
			break;
			case "editar_limitado":{
				$salida.='
				<button  onclick="return validar()" id="modificar" class="btn btn-default" type="submit" name="evento" value="editar_limitado">
				<span class="glyphicon glyphicon-edit" > </span>
				Editar
				</button>';			
				
			}		
			break;
			case 'regresar':{
				$salida.='
			<a  class="btn btn-default btn-sm" href="'.$_SERVER["HTTP_REFERER"].'" >
				<span class="glyphicon glyphicon-arrow-left"></span>
				Regresar
			</a>';
				
			}
			break;
		
		
		}
			$salida.='

		</div>
    </div>';
    return $salida;
    
 }
 function btn_regresar($vista){
	 return false;
}
 function btn_regresar_respaldo($vista){
	 if($_GET['ref'])
	 $vista=$_GET['ref'];
	 		return '
	 		
			<a style="margin:0px; padding:3px" class="btn btn-default btn-sm" href="?'.codificar('vista='.$vista).'" >
				<span class="glyphicon glyphicon-arrow-left"></span>
				Regresar
			</a>';
}

function verifica_problemas(){

	@include_once('modelo/class_db.php');

	$dbs= new db;
	$dbdp= new db;
	$dbpa= new db;
	$proble= new db;

	$sqlpa="select * from parametros_problemas where cod_parametro=1 ";
	$dbpa->ejecutar($sqlpa); $rowpa=$dbpa->row();

	$minimoa=$rowpa['minimo_aprobado'];
	$minimor=$rowpa['minimo_rechazado'];

	$sql_pro="select * from problema ";
	$dbs->ejecutar($sql_pro);
	$apr=0; $rp=0;
	while ($rowpr=$dbs->row()) {
		# code...
		
		$sql_dp="select * from detalle_condicion_problema where cod_problema='".$rowpr['cod_problema']."'";
		$dbdp->ejecutar($sql_dp);
		while ($rowe=$dbdp->row()) {
			# code...
			if($rowe['respuesta'] == 1){
				$apr++;
			}else{
				$rp++;
			}

		}

		//echo '<br> Problema -> '.$rowpr['cod_problema'].' # A-> '.$apr.' R-> '.$rp;

			if($apr >= $minimoa){
				$sql_aprueba="update problema set estatus=1 where cod_problema='".$rowpr['cod_problema']."' AND  estatus <> 3  ";
				$proble->ejecutar($sql_aprueba);
				//echo ' ** Se cumple A'.$apr;
			}else{
				//echo ' ** No cumple A';
			}

			if($rp >= $minimor){
				$sql_desaprueba="update problema set estatus=3 where cod_problema='".$rowpr['cod_problema']."' AND estatus <> 1 ";
				$proble->ejecutar($sql_desaprueba); 
				//echo ' ## Se cumple R'.$rp;
			}else{
				//echo ' ## No cumple R'.$rp;
			}
			$apr=0; $rp=0;

	}

	//exit();
	
}
function ocultar_menu(){
	if($_SESSION['cod_usuario']>0){
		$online=true;
		@include_once('modelo/class_db.php');	
		$db= new db;
		$db->ejecutar("SELECT * FROM usuario_estilo WHERE cod_usuario=".$_SESSION['cod_usuario']);
		$row=$db->row();
		
		if($row['menu_size']=='1') $modoa=true;	else $modob=true;		
			
		return ocultar_menu_scriptb($modoa,$modob,$online);
		  
	  }else{
		  return ocultar_menu_scriptb(false,true,$online);
		  }
	}
	
	function ocultar_menu_scriptb($modoa,$modob,$online){
				return "<script>
			".top_menu_script($modoa)."
			$(function () {
               
    $('#menu-toggle').toggle(
 function() {
            if($('#wrapper').hasClass('right-sidebar')) {
				
                $('body').removeClass('right-side-collapsed');
                $('#sidebar .slimScrollDiv').css('overflow', 'hidden');
                $('#sidebar .menu-scroll').css('overflow', 'hidden');
            } else{
				//PONER EN GRANDE EL MENU
				".ocultar_menu_script($modob)."
            }
        }
        ,function() {
            if($('#wrapper').hasClass('right-sidebar')) {
				
                $('body').addClass('right-side-collapsed')
                $('#sidebar .slimScrollDiv').css('overflow', 'initial');
                $('#sidebar .menu-scroll').css('overflow', 'initial');
            } else{
				//PONER PEQUEÑO EL MENU
				".ocultar_menu_script($modoa)."
            }
        }
    );
					   })
				  </script>";
		
		}
	
	function ocultar_menu_script($modo){
	
	if($modo){
		
		return "
		actualizar_menu(1);
		$('body').addClass('left-side-collapsed').removeClass('sidebar-colors');
                $('#sidebar .slimScrollDiv').css('overflow', 'initial');
                $('#sidebar .menu-scroll').css('overflow', 'initial');";
		}else{
			return "
			actualizar_menu(0);
			$('body').removeClass('left-side-collapsed')
                if(flag == true){
                    $('body').addClass('sidebar-colors');
                }
                $('#sidebar .slimScrollDiv').css('overflow', 'hidden');
                $('#sidebar .menu-scroll').css('overflow', 'hidden');";
			}
	}

function top_menu_script($modo){
	if($modo){
		return "$('body').addClass('left-side-collapsed').removeClass('sidebar-colors');
                $('#sidebar .slimScrollDiv').css('overflow', 'initial');
                $('#sidebar .menu-scroll').css('overflow', 'initial');";
		}
	}
?>
