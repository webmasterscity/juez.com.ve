<script type="text/javascript" src="libreria/bootstrap-3.3.6/js/bootbox.min.js"></script>
<?php

require_once("vista/campo/campo_ap_problemas.php");

class vista_problema extends campo_problema{
	
		public function reporte_html_general($vista){
				global $lib_data_table;
	$lib_data_table=true;
			$this->listar_admin();
		
			$parametro["tipo"]="consulta_nuevo";			
			$html='<script>

			var sub_titulo_pdf="Reporte de Problemas";
			</script>
			<script type="text/javascript" src="libreria/js_listado_general.js"></script>
			<div class="panel panel-default">
		<div class="panel-heading" style="text-align:center">
			'.$_SESSION['nombre_vista'].'
		</div>
			<div class="panel-body">
			
			
			
		<table id="data_table" class="table table-striped table-bordered" width="100%" cellspacing="0">
			<thead>
			<tr>
			<th width="80px">
			Nro.
			</th>
			<th>Código</th>
			<th>Título</th>
			<th>Aprobado</th>
			<th>Rechazado</th>
			
</tr>
			</thead>
			<tbody>
			';
			$i=0;
			$ap=0; $dp=0;
	while($row=$this->row()){

		$i++;
		$parametro['tipo']='botonera';
		$parametro['estatus']=$row['estatus'];
		$botonera=mostrar_btn($_SESSION['cod_tipo_usuario'],$vista,$parametro);
		$ancho=strlen($botonera)/5.4;

			$sql_suma="select * from detalle_condicion_problema where cod_problema='".$row['cod_problema']."'";
			$pro= new problema;

			$pro->ejecutar($sql_suma);
			while ($rowp=$pro->row()) {
				# code...
				if($rowp['respuesta'] == 1){
					$ap++;
				}else{
					$dp++;	
				}
			}

		$html.='

	<tr>
	<td class="td_botones">
	
		<form method="post"  class="div_botones_listar" style=" margin:0px; display:inline-block; width:'.$ancho.'px"> 
				'.$botonera.'

							<input type="hidden" name="cod_problema" value="'.$row['cod_problema'].'">
		</form>
	</td>
	<td>'.$row['cod_problema'].'</td>
	<td>'.$row['nombre'].'</td>

	<td>
		<span class="badge" style="background:green;">'.$ap.'</span>
		<span class="glyphicon glyphicon-arrow-right" ></span>
			
		';



		 	$sql_suma="select * from detalle_condicion_problema as dt, usuario as usa, persona as pe 
		 	where dt.cod_problema='".$row['cod_problema']."' AND usa.cod_usuario=dt.cod_usuario AND pe.cedula=usa.cedula";
			$pro= new problema;

			$pro->ejecutar($sql_suma);
			while ($rowp=$pro->row()) {
				# code...
				if($rowp['respuesta'] == 1){
					
					if($rowp['cod_usuario'] == $_SESSION['cod_usuario']){
						//$html.=' <span class="glyphicon glyphicon-user" style="color:blue; cursor:pointer;" onclick="muestra_perfil(\''.$rowp['nombre'].' '.$rowp['apellido'].'\',\''.strtoupper($rowp['observacion']).'\')" ></span> ';
						$html.='<img src="'.$rowp['foto_perfil_peque'].'" title="'.$rowp['nombre'].' '.$rowp['apellido'].'" style="width:10%;" class="img-circle" onclick="muestra_perfil(\''.$rowp['nombre'].' '.$rowp['apellido'].'\',\''.strtoupper($rowp['observacion']).'\',\''.$rowp['foto_perfil_peque'].'\',\''.$rowp['cod_usuario'].'\')">';
					}else{
						//$html.=' <span class="glyphicon glyphicon-user" onclick="muestra_perfil(\''.$rowp['nombre'].' '.$rowp['apellido'].'\',\''.strtoupper($rowp['observacion']).'\')" style="cursor:pointer" ></span> ';
						$html.='<img src="'.$rowp['foto_perfil_peque'].'" title="'.$rowp['nombre'].' '.$rowp['apellido'].'" style="width:10%;" class="img-rounded" onclick="muestra_perfil(\''.$rowp['nombre'].' '.$rowp['apellido'].'\',\''.strtoupper($rowp['observacion']).'\',\''.$rowp['foto_perfil_peque'].'\',\''.$rowp['cod_usuario'].'\')">';
					}
					//$html.=' <span class="glyphicon glyphicon-user" onclick="muestra_perfil(\''.$rowp['nombre'].' '.$rowp['apellido'].'\',\''.strtoupper($rowp['observacion']).'\')" style="cursor:pointer" ></span> ';

				}else{
						
				}
			}

		 $html.='
		 
	</td>
	<td>  

		<span class="badge" style="background:red;">'.$dp.'</span>
		<span class="glyphicon glyphicon-arrow-right" ></span>';

		 	$sql_sumas="select * from detalle_condicion_problema as dt, usuario as usa, persona as pe 
		 	where dt.cod_problema='".$row['cod_problema']."' AND usa.cod_usuario=dt.cod_usuario AND pe.cedula=usa.cedula";
			$pros= new problema;

			$pros->ejecutar($sql_sumas);
			while ($rowps=$pros->row()) {
				# code...
				if($rowps['respuesta'] == 2){
					if($rowps['cod_usuario'] == $_SESSION['cod_usuario']){
						//$html.=' <span class="glyphicon glyphicon-user" style="color:blue; cursor:pointer;" onclick="muestra_perfil(\''.$rowps['nombre'].' '.$rowps['apellido'].'\',\''.strtoupper($rowps['observacion']).'\')" ></span> ';
						$html.='<img src="'.$rowps['foto_perfil_peque'].'" title="'.$rowps['nombre'].' '.$rowps['apellido'].'" style="width:10%;" class="img-circle" onclick="muestra_perfil(\''.$rowps['nombre'].' '.$rowps['apellido'].'\',\''.strtoupper($rowps['observacion']).'\',\''.$rowps['foto_perfil_peque'].'\',\''.$rowps['cod_usuario'].'\')">';

					}else{
						//$html.=' <span class="glyphicon glyphicon-user" onclick="muestra_perfil(\''.$rowps['nombre'].' '.$rowps['apellido'].'\',\''.strtoupper($rowps['observacion']).'\')" style="cursor:pointer" ></span> ';
						$html.='<img src="'.$rowps['foto_perfil_peque'].'" title="'.$rowps['nombre'].' '.$rowps['apellido'].'" style="width:10%;" class="img-rounded" onclick="muestra_perfil(\''.$rowps['nombre'].' '.$rowps['apellido'].'\',\''.strtoupper($rowps['observacion']).'\',\''.$rowp['foto_perfil_peque'].'\',\''.$rowps['cod_usuario'].'\')">';

					}

					

				}else{
						
				}
			}

		 $html.='

	</td>
	
	</tr>';
	$ap=0; $dp=0;
	}

	
	
			$html.='
			</tbody>
				</table>
				';
				
	

			return $html;
		}
		
		public function reporte_html_individual(){
			$this->consultar();

			$pr= new problema;
			$sqlp="select * from detalle_condicion_problema where cod_usuario='".$_SESSION['cod_usuario']."' AND cod_problema='".$this->cod_problema."'";
			if($pr->ejecutar($sqlp)){
				$rowdp=$pr->row();

				$dis="disabled";
				$si=1;
			}else{
				$dis="";
				$si=2;
			} 


		$html= '
			<form method="post" onsubmit="return validame()">
			<div class="panel panel-default">
			<div class="panel-heading" style="text-align:center">
				<div class="row">
					<div class="col-md-3"></div>
					<div class="col-md-6"><span style="font-size:18px"><span class="glyphicon glyphicon-education"></span> Consulta detallada del problema</span></div>
					<div class="col-md-3">'.btn_regresar('ap_problema').'</div>
				</div>
			</div>
			<div class="panel-body" >
				
			<div class="row" >
				<div class="col-md-1"></div>
				<div class="col-md-5">
					<label>
						Código: 
					</label> '.$this->cod_problema.'
				</div>
			<div class="col-md-5">
					<label>
						Título: 
					</label> '.$this->nombre.'
				</div>
			</div>

		
			<div class="row">
			<div class="col-md-1"></div>
				<div class="col-md-5">
					<label>
						Límite de tiempo: 
					</label> '.$this->limite_tiempo.' Segundos
				</div>
				<div class="col-md-5">
					<label>
						Imagen: <br>
					</label> 
					
					'.($this->texto_problema ? '<img src="'.$this->texto_problema.'" width="80px" />' : 'No aplica').'
				</div>
			</div>

		
			<div class="row">
			<div class="col-md-1"></div>
				<div class="col-md-10" ><br>
					<div style="text-align:center">
						<b>ENUNCIADO</b>
					</div>  <br> '.$this->enunciado.'
				</div>
			</div>
			<div class="row">
				<div class="col-md-1"></div>
					<div class="col-md-10" >
						<div style="text-align:center">
							
						</div>  '.$this->detalle_html().'
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-3"></div>
					<div class="col-md-6" >


							<div class="panel panel-default">
								<div class="panel-heading">

									<div class="row">
											<div class="col-md-8">
												<label><span class="glyphicon glyphicon-thumbs-up"></span> Aprobar / 
												<label><span class="glyphicon glyphicon-thumbs-down"></span> Desaprobar Problema</label>
											</div>

											<div class="col-md-4">
												<a class="btn" href="?'.codificar('vista=participar_entrenamiento&evento=formulario_envio&cod_problema='.$this->cod_problema.'').'" target="blanck"><u>Probar Problema</u></a>
											</div>
									</div>

										
								</div>
									<div class="panel-body">

										<label>Observación</label>
										<textarea class="form-control" '.$dis.' name="observacion">'.$rowdp['observacion'].'</textarea> 
										
										<br>';

										if($si == 2){
											$html.='
											<center>
												<input type="hidden" name="problema" value="'.$this->cod_problema.'">
												<button class="btn btn-default" name="evento" value="aprobar" type="submit">
													<span class="glyphicon glyphicon-thumbs-up"></span> Aprobar
												</button>

												<button class="btn btn-danger" name="evento" value="desaprobar" type="submit">
													<span class="glyphicon glyphicon-thumbs-down"></span> Desaprobar
												</button>

											</center>

											';
										}
										$html.='

									</div>
								</div>
							</div>		



						
					</div>
				</div>
			</div>



			</div>
			</form>
		';
		return $html;
	
		}
		public function formulario($tipo){
			switch($tipo){
				case 'modificar': {
					parent::consultar();
					$boton=botones('actualizar');
					$titulo='Modificar Problema';
				}break;
				case 'registrar':{
					$boton=botones('registrar');
					$titulo='Agregar Nuevo Problema';
				}break;
			}
		$html= '
			<form method="post" action="?'.codificar('vista=problema').'" enctype="multipart/form-data">
			<script type="text/javascript" src="js/js_problema.js" ></script>

			<div class="panel panel-default">
				<div class="panel-heading" style="text-align:center">
					<div class="row">
						<div class="col-md-3"></div>
						<div class="col-md-6"><span style="font-size:18px"><span class="glyphicon glyphicon-user"></span> '.$titulo.'</span></div>
						<div class="col-md-2 col-md-offset-1">'.btn_regresar('problema').'</div>
					</div>
				</div>
			<span style="float:right; color:red">(*) Campos obligatorios</span>
			<input readonly id="cod_problema" class="form-control" type="hidden" name="cod_problema" value="'.$this->cod_problema.'" />

				
		<div class="row">
				<div class="col-md-1"></div>
					'.$this->nombre().'
						'.$this->limite_tiempo().'
						'.$this->limite_memoria().'
					'.$this->texto_problema().'
		</div>

	
		<div class="row">
					<div class="col-md-3"></div>
				
					
		</div>
		<div class="row">
					
					'.$this->enunciado().'
					
					
		</div>



		'.$this->detalle().'
			
			<div class="row"><br>
				<div class="col-md-3"></div>
				'.$boton.'<br>
			</div>	
		</div>
			<script src="libreria/nic/nicEdit-latest.js" type="text/javascript"></script>
			<script type="text/javascript">
			new nicEditor({fullPanel : true}).panelInstance("enunciado");
			</script>
		';
		return $html;
	
		}
		
		private function detalle(){
			$html.='
					<br><div class="row">
		<div class="col-md-12">

		  <!-- Nav tabs -->
		  <ul class="nav nav-tabs" role="tablist">
			<li role="presentation" class="active">
			<a href="#caso_de_prueba" aria-controls="problemas" role="tab" data-toggle="tab">
			<span class="glyphicon glyphicon-arrow-down"></span> Casos de prueba</a></li>
			</ul>

		  <!-- Tab panes -->
		  <div class="tab-content"> 
			<div role="tabpanel" class="tab-pane active" id="caso_de_prueba">
			<table class="table table-striped" id="tabla_detalle">
					<thead>
					<tr>
						<th>Datos de entrada  <span style=" color:red" title="campo obligatorio"> (*) </span></th>
						<th>Datos de salida  <span style=" color:red" title="campo obligatorio"> (*) </span></th>
						<th>Descripción</th>
						<th style="text-align:center" title="Seleccione si desea que este caso aparesca insertado en el enunciado como ejemplo.">Ejemplo</th>
						<th><button class="btn btn-success btn-sm" onclick="return agregar_fila(\'\',\'\',\'\',\'\')"> <span class="glyphicon glyphicon-plus"> </span> </button></th>
					</tr>
					</thead>
					<tbody>
						
					</tbody>
				</table>	
				
			</div>

		  </div>

		</div>
		</div>
			<script>
			'.$this->consultar_casos_de_prueba().'
			</script>';
			
			return $html;
		}
		private function detalle_html(){
			$html.='
					<br><div class="row">
		<div class="col-md-12">

		  <!-- Nav tabs -->
		  <ul class="nav nav-tabs" role="tablist">
			<li role="presentation" class="active">
			<a href="#caso_de_prueba" aria-controls="problemas" role="tab" data-toggle="tab">
			<span class="glyphicon glyphicon-arrow-down"></span> Casos de prueba</a></li>
			</ul>

		  <!-- Tab panes -->
		  <div class="tab-content"> 
			<div role="tabpanel" class="tab-pane active" id="caso_de_prueba">
			<table class="table table-striped" id="tabla_detalle">
					<thead>
					<tr>
						<th>Datos de entrada  </th>
						<th>Datos de salida  </th>
						<th>Descripción</th>
						<th style="text-align:center">Caso de ejemplo</th>
						
					</tr>
					</thead>
					<tbody>
						'.$this->consultar_casos_de_prueba_html().'
					</tbody>
				</table>	
				
			</div>

		  </div>

		</div>
		</div>
';
			
			return $html;
		}
			private function consultar_casos_de_prueba(){
				require_once("modelo/class_caso_de_prueba.php");
				$caso_de_prueba = new caso_de_prueba;
				$caso_de_prueba->set_cod_problema($this->cod_problema);
				$caso_de_prueba->consulta_por('cod_problema');
				while($row=$caso_de_prueba->row()){
					$js.='
					agregar_fila('.json_encode($row['input']).','.json_encode($row['output']).','.json_encode($row['descripcion']).','.json_encode($row['ejemplo']).');';
				}
				return $js;
				
			}		
			private function consultar_casos_de_prueba_html(){
				require_once("modelo/class_caso_de_prueba.php");
				$caso_de_prueba = new caso_de_prueba;
				$caso_de_prueba->set_cod_problema($this->cod_problema);
				$caso_de_prueba->consulta_por('cod_problema');
				while($row=$caso_de_prueba->row()){
					$td.='
					<tr><td>'.$row['input'].'</td><td>'.$row['output'].'</td><td>'.$row['descripcion'].'</td><td style="text-align:center">'.($row['ejemplo']==1 ? 'SI' : 'NO').'</td></tr>';
				}
				return $td;
				
			}		
		
}
?>

<script type="text/javascript">

function muestra_perfil(dato,obc,im,usu){
	bootbox.alert("<a href='?vista=dato_personal&evento=dato_personal_html&cod="+usu+"' target='blanck'><b>USUARIO: "+dato+"</b> <br><img src='"+im+"'><br></a><b> <center>OBSERVACION SOBRE EL PROBLEMA</center> </b> <textarea class='form-control' disabled>"+obc+"</textarea>");
}

function validame(){

	if(confirm('Esta seguro de realizar la operación ...? ')){
		return true;
	}else{
		return false;
	}
}
</script>
