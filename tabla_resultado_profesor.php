<?php
session_start();
ini_set('display_errors','OFF');
//error_reporting(E_ALL ^E_NOTICE ^E_DEPRECATED);
require_once("libreria/funciones_generales.php");
$cod_concurso=$_GET['cod_concurso'];
if($_SESSION['cod_tipo_usuario']==1 or $_SESSION['cod_tipo_usuario']==2 or !$_SESSION['cod_tipo_usuario']){
	exit('Dicen que nada es imposible ;)');
}else{
	echo envios_concurso($cod_concurso);
}
		
function envios_concurso($cod_concurso){
		
		require_once("modelo/class_envio.php");
		
		require_once("modelo/class_det_envio_comparacion.php");
		
		$envio = new envio;
				
		$det_envio_comparacion= new det_envio_comparacion;
		
		$envio->set_cod_concurso($cod_concurso);

		$envio->ultimos_envios();

		while($row=$envio->row()){
			$det_envio_comparacion->set_cod_envio($row['cod_envio']);
			$td.='<tr class="'.($row['cod_msj_salida']==1 ? 'success': 'danger').'">';
			$td.='<td>'.$row['cod_envio'].'</td>';
			$td.='<td>'.$row['fecha_hora'].' VEN</td>';
			$td.='<td>'.$row['nombre_equipo'].'</td>';
			$td.='<td><a href="?'.codificar('vista=participar_entrenamiento&evento=formulario_envio&cod_problema='.$row['cod_problema']).'" >'.$row['nombre_problema'].'</a></td>';
			$td.='<td>'.$row['nombre_lenguaje'].'</td>';
			switch($row['cod_msj_salida']){
					case '1': {
						$color='green';
						$icono='glyphicon glyphicon-ok';
					}
					break;
					default: {
						$color='red';
						$icono='glyphicon glyphicon-thumbs-down';
						}
					break;
			}
			$td.='<td style="color:'.$color.'"><span class="'.$icono.'"> </span> '.$row['resultado'].'</td>';
			$td.='</tr>';
			if($det_envio_comparacion->consultar()>0){
				$td.='<tr style="text-align:center" ><td colspan="4">Resultado Esperado</td><td colspan="3">Resultado Obtenido</td></tr>';
				while($row_det=$det_envio_comparacion->row()){
					$td.='<tr ><td colspan="4" >'.nl2br(htmlentities($row_det['salida_esperada'])).'</td><td  colspan="2">'.nl2br(htmlentities($row_det['salida'])).'</td></tr>';
				}
			}
			$td.='<tr style="text-align:center" ><td colspan="4">Codigo enviado</td><td colspan="3">Error de compilación</td></tr>';
			$td.='<tr style="border-bottom:2px solid #445675" ><td colspan="4" >'.nl2br(htmlentities($row['codigo_fuente'])).'</td><td  colspan="2">';
			$recom=trim($row['resultado_compilacion']);
			if(!$recom || $recom==1)
			$td.='No disponible';
			else 
			$td.=$row['resultado_compilacion'];
			$td.=' </td></tr>';
		}
		$html='
				<div class="panel panel-default">
					<div class="panel-heading">
						Ultimos envios	
					</div>
					<div class="panel-body">
				<table class="table table-bordered" style="font-size:13px"><tr>
					<th>Cod.</th>
					<th>Fecha</th>
					<th>Equipo</th>
					<th title="Codigo del problema">Prob.</th>
					<th>Lenguaje</th>
					<th>Resultado</th>
				</tr>'.$td.'</table>
			</div>
		</div>
		';		
		return $html;
	
}
?>
