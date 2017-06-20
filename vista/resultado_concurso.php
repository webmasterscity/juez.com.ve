<?php
	require_once("modelo/class_problema_concurso.php");
	require_once("modelo/class_det_concurso_equipo.php");
	require_once("libreria/funciones_generales_concurso.php");
	class resultado_concurso extends problema_concurso{
	public $tipo, $nombre_equipo, $nombre_corto;
	
	public function resultado_concurso(){
		$cod_concurso=$_GET['cod_concurso'];
		$concurso = new concurso;
		$concurso->set_cod_concurso($cod_concurso);
		$concurso->consultar();
		$html='
		<div class="panel panel-default">
			<div class="panel-heading" style="text-align:center">
				<div class="row">
					<div class="col-xs-3 col-md-4" style="text-align:left">
										
										 '.($_SESSION['login'] ? $this->nombre_equipo : '').'
					</div>		
					<div class="col-md-4" style="text-align:center">
						<span style="font-size:18px"><span class="glyphicon glyphicon-education"></span>'.$concurso->nombre_corto.'</span>					
					</div>

				</div>		
			</div>
			<div class="panel-body">
				'.($_SESSION['login'] ? titulo_menu($concurso->cod_concurso,$_GET['evento']) : '').'

					<div id="resultado_div"> </div>
					
					<div style="text-align:right; font-size:12px">1) Cada envío incorrecto sera penalizado con 20 minutos de tiempo. 2) El tiempo es importante en caso de empates.</div>

					<div class="row">
				<div class="col-md-3">
					<table class="table table-striped" style="font-size:12px">
						<tr>
							<td style="text-align:center;  border: 1px solid #CCC" >Leyenda:</td>
						</tr>
						<tr>
							<td style="background:#71FF85; text-align:center; border: 1px solid #CCC" >Problema solucionado</td>
						</tr>
						<tr>
							<td style="background:#FE8494; text-align:center; border: 1px solid #CCC" >Problema no solucionado</td>
						</tr>
						<tr>
							<td style=" text-align:center; border: 1px solid #CCC" >Sin envíos</td>
						</tr>
					</table>
				</div>
					
						<div class="col-md-3" style="text-align:center">
							<table style="text-align:center">
								<tr><td><h5>Congelar resultados</h5></td></tr>
								<tr><td>'.tiempo_restante($concurso->cod_concurso,$concurso->tiempo_inicio,$concurso->tiempo_conjelacion,'congelacion').'</td></tr>
							</table>
						</div>
						<div class="col-md-3" style="text-align:center">
							<table style="text-align:center">
								<tr><td><h5>Finalizar el concurso</h5></td></tr>
								<tr><td>'.tiempo_restante($concurso->cod_concurso,$concurso->tiempo_inicio,$concurso->tiempo_final,'descongelar').'</td></tr>
							</table>
						</div>
						<div class="col-md-3" style="text-align:center" >
							<table style="text-align:center">
								<tr><td><h5>Mostrar resultados</h5></td></tr>
								<tr><td>'.tiempo_restante($concurso->cod_concurso,$concurso->tiempo_inicio,$concurso->tiempo_desconjelar,'final').'</td></tr>
							</table>
						</div>
				
			</div>
		
				</div>
			</div>
		
		<script>
		$(document).ready(function(){
		cargar_resultado();
		setInterval(cargar_resultado,5000);
		});

		function cargar_resultado(){
		$("#resultado_div").load("tabla_resultado.php?cod_concurso='.$concurso->cod_concurso.'");
		}
		</script>

			';
			
			return $html;
		
	}


		
}

?>
