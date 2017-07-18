<?php
	require_once("vista/campo/campo_usuario.php");
	require_once("vista/campo/campo_persona.php");
	
	class vista_cambio_rol extends campo_usuario{

	public function cambiar_rol(){
		require_once("modelo/class_tabla_posicion.php");
		require_once("modelo/class_det_usuario_equipo.php");
		require_once("modelo/class_cambiar_rol.php");
		$det_usuario_equipo= new det_usuario_equipo;
		$tabla_posicion= new tabla_posicion;
		$det_usuario_equipo->set_cod_usuario($this->cod_usuario);
		$det_usuario_equipo->consulta_por('cod_usuario');
		$row_det_usuario_equipo=$det_usuario_equipo->row();
		$nombre_equipo=$row_det_usuario_equipo['nombre_equipo'];
		$cod_equipo=$row_det_usuario_equipo['cod_equipo'];
		$tabla_posicion->set_cod_equipo($row_det_usuario_equipo['cod_equipo']);

		$det= new det_usuario_equipo;

		$sqldt="select * from solicitud_cambio_rol as cr, tipo_usuario as tp where cr.cod_usuario='".$_SESSION['cod_usuario']."' AND tp.cod_tipo_usuario=cr.cod_rol AND cr.estatus='1' ";
		if($det->ejecutar($sqldt)){
			$row=$det->row();
			$_SESSION['msj']='Su solicitud de cambio a '.$row['nombre'].' se esta evaluando.';
			$_SESSION['msj_tipo']='success';
			//exit('<script> window.location.href="index.php"; </script>');

			$sis=1;
		}

		parent::consultar();
		$html.='
		
		<script type="text/javascript" src="js/js_cambio_rol.js" ></script>
			<link rel="stylesheet" type="text/css" href="css/usuario.css" />
				<div class="panel panel-default">
				
					<div class="panel-heading" style="text-align:center">
						<span style="font-size:18px"><span class="glyphicon glyphicon-user"></span> Solicitud De Cambio De Rol</span>
					</div>
					<div class="panel-body">
					<form method="POST" autocomplete="off" enctype="multipart/form-data">
					<div class="row"><div class="col-md-12" style="color:red; text-align:right">(*) Todos los campos son obligatorios</div></div>
						<div class="row">
						<div class="col-md-2"></div>
						<input type="hidden" name="codigo_coli" value="'.$row['cod_cambio'].'">
						
						<div class="col-md-3">
							<label>
								Rol Solicitado<span style="color:red" title="Campo obligatorio">(*)</span>
							</label>
								'.$this->combo_tipo_usuario_rol($row['cod_rol']).'

						</div>

						<div class="col-md-4">
							<label>
								Carnet institucional (imagen JPG)<span style="color:red" title="Campo obligatorio">(*)</span>
							</label>
								<input required type="file" id="documento" name="documento" class="form-control" value="" accept="image/*">

						</div>
						</div>

						<div class="row">
							<div class="col-md-2"></div>
							<div class="col-md-8">
								<label>
									Motivo <span style="color:red" title="Campo obligatorio">(*)</span>
								</label>

									<textarea required id="motivo" name="motivo" class="form-control">'.strtoupper($row['motivo']).'</textarea>
							</div>

						</div>
						<br>
						<div class="col-md-3"></div>
						<div class="col-md-6">
							<div style="text-align:center">

								';

								if($sis == 1){

									$html.=botones('actualizar');

								}else{
									$html.='
								<button  onclick="return validar()" id="registrar" class="btn btn-primary btn-lg"  type="submit" name="evento" value="guardar_soli">
									<span class="glyphicon glyphicon-floppy-disk" > </span>
									Solicitar
								</button>';
							}

								$html.='
							</div>
						</div>
	

						<div class="row">
							<div class="col-md-3">
							
							</div>

						</div>	
						</form>				
					</div>
					
				
				
			
					';
		return $html;		
		
		
		
	}
}
?>
