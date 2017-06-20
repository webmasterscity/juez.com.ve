<?php
	//echo 'Armando'; exit();
//echo '##### Vista <br>'; 
require_once("vista/campo/campo_listado_soli_rol.php");

	class vista_listado_soli_rol extends campo_listado_soli_rol{


		public function reporte_html_general($vista){
				global $lib_data_table;
			$lib_data_table=true;

			$this->listar_admin();
			$parametro["tipo"]="consulta_nuevo";			
			$html='<script>

			var sub_titulo_pdf="Reporte de Lenguajes de Programación";
			</script>
			<script type="text/javascript" src="libreria/js_listado_general.js"></script>
			<div class="panel panel-default">
			<div class="panel-heading" style="text-align:center">
				<div class="row">
					<div class="col-xs-3 col-md-4" style="text-align:left">
						'.mostrar_btn($_SESSION['cod_tipo_usuario'],$vista,$parametro).'					
					</div>		
					<div class="col-md-4" style="text-align:center">
						<span style="font-size:18px"><span class="glyphicon glyphicon-user"></span>
						<span style="font-size:18px"><span class="glyphicon glyphicon-transfer"></span>

						Solicitudes de cambio de Rol</span>					
					</div>
					<div class="col-md-4" style="text-align:right">
						'.btn_regresar('').'
					</div>
				</div>		
			</div>
			<div class="panel-body">
			
			
			
		<table id="data_table" class="table table-striped table-bordered" width="100%" cellspacing="0">
			<thead>
			<tr>
			<th width="80px">
			Nro
			</th>
				<th>Usuario</th>
				<th>Rol Actual</th>
				<th>Rol Solicitado</th>
				<th>Fecha Solicitud</th>
				<th>Estatus</th>
			</tr>
			</thead>
			<tbody>
			';
			$i=0;
			
	while($row=$this->row()){
		$i++;
		$parametro['tipo']='botonera';
		$parametro['estatus']=$row['estatus_soli'];
		$botonera=mostrar_btn($_SESSION['cod_tipo_usuario'],$vista,$parametro);
		$ancho=strlen($botonera)/5.4;
		$html.='
	<tr>
	<td class="td_botones">
	
		<form method="post"  class="div_botones_listar" style=" margin:0px; display:inline-block; width:'.$ancho.'px"> <span style=" float:left; margin-right:1px;">'.$i.' 
		
			</span>
				<button  type="submit" name="evento" value="formulario_modificar" title="Modificar" class="btn btn-success btn-xs"><span class="glyphicon glyphicon-edit"></span></button>

										<input type="hidden" name="cod_cambio" value="'.$row['cod_cambio'].'">
		</form>
	</td>
		<td>'.$row['cedula'].' '.$row['nombre_p'].' '.$row['apellido'].'</td>
		<td>'.$_SESSION['nombre_tipo_usuario'].'</td>
		<td>'.$row['nombre_tipo'].'</td>
		<td>'.date('d-m-Y',strtotime($row['fecha'])).'</td>
		<td>'.($row['estatus_soli']==1 ? 'Pendiente' : 'Inactivo').'</td>
	</tr>';
	}
	
			$html.='
			</tbody>
				</table>
				</div>
				';
				
	

			return $html;
		}

		public function formulario($tipo){
			switch($tipo){
				case 'modificar': {
					parent::consultar();
					//$boton=botones('modificar');
					$titulo='Aceptar / Denegar Solicitud de Cambio de Rol';
				}break;
				case 'registrar':{
					$boton=botones('registrar');
					$titulo='Agregar Nuevo Lenguaje de Programación';
				}break;
			}

			$gt= new cambio_rol;
				$gt->set_cod_cambio($this->cod_cambio);
				$gt->consultar_admin();
				$rowgt=$gt->row();
		$html= '
			
			<link rel="stylesheet" type="text/css" href="css/usuario.css" />
				<div class="panel panel-default">
				<form method="POST" autocomplete="off" enctype="multipart/form-data" onsubmit="return confirmame()">
					<div class="panel-heading" style="text-align:center">
						<div class="row">
							<div class="col-md-3"></div>
							<div class="col-md-6"><span style="font-size:18px"><span class="glyphicon glyphicon-user"></span> Solicitud De Cambio De Rol</span></div>
							<div class="col-md-3">'.btn_regresar('').'</div>
						</div>
					</div>
					<div class="panel-body">
						<div class="row">
						<div class="col-md-2"></div>

							<input type="hidden" name="cod_cambio" value="'.$rowgt['cod_cambio'].'">
							<input type="hidden" name="rol" value="'.$rowgt['nombre_tipo'].'">
							<input type="hidden" name="cod_rol" value="'.$rowgt['cod_rol'].'">
							<input type="hidden" name="usu" value="'.$rowgt['cod_usuario'].'">
							<input type="hidden" name="dato" value="'.$rowgt['cedula'].' '.$rowgt['nombre_p'].' '.$rowgt['apellido'].'">
						<div class="col-md-4">
							<b>Solicitante: </b> '.$rowgt['cedula'].' '.$rowgt['nombre_p'].' '.$rowgt['apellido'].'
						</div>

						
						

						<div class="col-md-3">
							<b> Rol Solicitado: </b>'.$rowgt['nombre_tipo'].'
								

						</div>
						</div>
						<br>

						<div class="row">
						<div class="col-md-2"></div>
						<div class="col-md-4">
							<label>
								Documento <span style="color:red" title="Campo obligatorio">(*)</span>
							</label>
								<img class="img-thumbnail" src="archivos/cambio_rol/'.$rowgt['documento'].'" style="width:30%; cursor:pointer;" onclick="grande(\''.$rowgt['documento'].'\')">

						</div>
						</div>

						<div class="row">
							<div class="col-md-2"></div>
							<div class="col-md-8">
								<label>
									Motivo <span style="color:red" title="Campo obligatorio">(*)</span>
								</label>

									<textarea id="" disabled name="motivo" class="form-control">'.$rowgt['motivo'].'</textarea>
							</div>

						</div>
						<br>
						<div class="row">
							<div class="col-md-2"></div>
							<div class="col-md-8">
								<label>
									Observación 
								</label>

										<textarea id=""  name="observa" class="form-control"></textarea>
							</div>

						</div>
						<div class="col-md-3"></div>
						<div class="col-md-6">
							<div style="text-align:center">
								<button  onclick="return validar()" id="" class="btn btn-primary btn-lg"  type="submit" name="evento" value="aprobar">
									<span class="glyphicon glyphicon-floppy-saved" > </span>
									Aprobar
								</button>

								<button  onclick="return validar()" id="registrar" class="btn btn-danger btn-lg"  type="submit" name="evento" value="denegar">
									<span class="glyphicon glyphicon-floppy-remove" > </span>
									Denegar
								</button>
							</div>
						</div>
	

						<div class="row">
							<div class="col-md-3">
							
							</div>

						</div>					
					</div>
				
				
			</form>
		


		';
		return $html;
	
		}
		
		
	}
?>
<script type="text/javascript">
	function grande(l){
		
		bootbox.alert("<center> <img class='img-thumbnail'  src='archivos/cambio_rol/"+l+"'> </center>");
		
	}

	function confirmame(){

		if(confirm('Seguro de Realizar esta operación ...?')){  }else{
			alert('no'); return false;
		}

		
	}
</script>
