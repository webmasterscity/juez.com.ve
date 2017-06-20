<?php
require_once("modelo/class_parametros_problemas.php");
require_once("modelo/class_privilegio.php");
$evento=$_POST['evento'];
$parametros_problemas = new parametros_problemas;
$detalle = new parametros_problemas;
$detalles = new parametros_problemas;

$parametros_problemas->set_cod_parametro($_POST['cod_parametro']);
$parametros_problemas->set_minimo_aprobar($_POST['minimoa']);
$parametros_problemas->set_minimo_rechazar($_POST['minimor']);
switch($evento){
	case 'modificar' :{
		$parametros_problemas->editar();

			$detalle->eliminar_detalle();
				$privilegio = new privilegio;
			$privilegio->set_cod_vista_sistema(139);
			$privilegio->elimina_por("cod_vista_sistema");
			

				foreach ($_POST['rol'] as $key => $valor) {
					# code...
					$detalles->registrar_detalle($valor);

					$privilegio->set_cod_vista_sistema(139);
					$privilegio->set_cod_tipo_usuario($valor);
					$privilegio->set_consultar(1);
					$privilegio->set_registrar(0);
					$privilegio->set_eliminar(0);
					$privilegio->set_actualizar(0);
					$privilegio->set_desactivar(0);
					$privilegio->registrar();
				}
			
		


		$_SESSION['msj_tipo']='success';
		$_SESSION['msj']='Actualizado correctamente.';
	}
	
}
			$parametros_problemas->consultar();
			$row_parametros_problemas=$parametros_problemas->row();
?>
