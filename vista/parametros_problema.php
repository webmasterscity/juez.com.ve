<?php
$msj_aprobado='Cantidad de aprobaciones necesarias para que un problema este disponible al publico.';
$msj_rechazado='Cantidad de rechazos necesarios para que un problema sea anulado.';
?>
<script type="text/javascript" src="js/js_parametro_problemas.js"></script>
	<div class="panel panel-default">
		<div class="panel-heading" style="text-align:center">
					<?php echo $_SESSION['nombre_vista']; ?>
			</div>

		<div class="panel-body">
		<form method="post" >
			<div class="row">
			
				<div class="col-md-2"></div>
			<div class="col-md-4">
				

				<div class="panel panel-default">
					<div class="panel-heading">
							<label><span class="glyphicon glyphicon-cog"></span> Parametros </label>
					</div>
					<div class="panel-body">	
						<div class="row">
							<div class="col-md-8">
								<label> Aprobaciones necesarias <span style="color:red" href="#" style="cursor:pointer;" onclick="msj_ayuda(1)" title="<?php echo $msj_aprobado; ?>" >(?)</span></label>
								<input type="text" name="minimoa" id="minimoa" class="form-control" value="<?php echo $row_parametros_problemas['minimo_aprobado']; ?>">
							</div>
						</div>	

						<div class="row">
							<div class="col-md-8">
								<label > Rechazos necesarios <span style="color:red" href="#" style="cursor:pointer;" onclick="msj_ayuda(2)" title="<?php echo $msj_rechazado; ?> " >(?)</span></label>
								<input type="text"  name="minimor" id="minimor" class="form-control" value="<?php echo $row_parametros_problemas['minimo_rechazado']; ?>">
							</div>
						</div>	

						<div class="row">
							<div class="col-md-10">
								<label > Roles Permitidos <span style="color:red" href="#" style="cursor:pointer;" onclick="msj_ayuda(3)" title="Roles permitidos que tendran acceso al proceso de aprobacion u rechazado de los problemas plateados">(?)</span></label>
									<table style="width:100%;">
										<tr>
											<td>
												<select class="form-control" id="roles" >
													<option value="-">Seleccione</option>
													<?php
														$conf = new parametros_problemas;
														$sql="select * from tipo_usuario";
														$conf->ejecutar($sql);

														while ($row=$conf->row()) {
															# code...
															echo '<option value="'.$row['cod_tipo_usuario'].'*'.$row['nombre'].'">'.$row['nombre'].'</option>';
														}
													?>
												</select>
											</td>
											<td>
												<a class="btn btn-default" onclick=" agrega_detalle()" title="Agregar Rol"><span class="glyphicon glyphicon-plus-sign"></span></a>
											</td>
										</tr>
									</table>

								
								
							</div>
						</div>

						<br>

				<center>
				<?php echo botones('modificar'); ?>
				
				</center>	

					</div>
				</div>
				


			</div>


			<!--############################3 !-->

			<div class="col-md-4">
				

				<div class="panel panel-default">
					<div class="panel-heading">
							<label><span class="glyphicon glyphicon-list"></span> Roles que aprueban el problema</label>
					</div>
					<div class="panel-body">

					<div style="width:100%; max-height: 238px;  overflow: auto;">	
						
					<table class="table table-bordered" id="detalle">

						<thead></thead>
						<tbody></tbody>

						<?php
							$deta= new parametros_problemas;

							$deta->consultar_detalle();

							$d=0;

							while ($rowd=$deta->row()) {
								# code...
								echo '
									<tr id="tr_'.$d.'"> 
										<td><span class="glyphicon glyphicon-ok"></span> <input type="hidden" name="rol[]" id="rol_'.$d.'" value="'.$rowd['cod_rol'].'">'.$rowd['nombre'].'</td>
										<td><a class="btn" onclick="borrar(tr_'.$d.')"> <span class="glyphicon glyphicon-remove-sign"></span></a></td>
									</tr>

									<script>
										i++;
										
									</script>
								';
								$d++;
							}
						?>
						
						
					</table>

					</div>
				</div>


			</div>

				</div>
			</div>
		</form>	
		</div>



<script type="text/javascript">
	
	function msj_ayuda(a){

		if(a == 1){
			msja="<?php echo $msj_aprobado; ?>";
		}

		if(a == 2){
			msja="<?php echo $msj_rechazado; ?>";
		}

		if(a == 3){
			msja="Roles que tendran acceso para aprobar o rechazar un problema.";
		}
		

		bootbox.alert('<center><img src="images/ayuda.jpg"   style="width:10%;"> <br><b>'+msja+'<b></center>');
	}
</script>


