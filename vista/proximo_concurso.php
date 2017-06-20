

<?php
echo '
<div class="panel panel-default">
			<div class="panel-heading center">
					'.$_SESSION['nombre_vista'].'
			</div>
		<div class="panel-body">
			'.ultimos_concursos().'
		</div>
	</div>


';
function ultimos_concursos(){
		require_once("modelo/class_concurso.php");
		$concurso = new concurso;
		$concurso->ultimos_concursos();

		while($row=$concurso->row()){
			$fecha_final= strtotime($row['tiempo_final']);
			$fecha_inicio= strtotime($row['tiempo_inicio']);
			$fecha_actual=time();
			$color='';
			$estatus='';
			if($fecha_inicio>$fecha_actual and $fecha_final>$fecha_actual){
				$estatus='<a href="#">Próximo</a>';
				$color='info';
				
			}
			if($fecha_inicio<$fecha_actual and $fecha_final>$fecha_actual){
				$estatus='<a href="?'.codificar('vista=resultado_concurso&cod_concurso='.$row['cod_concurso']).'" >Activo</a>';
				$color='success';
			}
			if($fecha_inicio<$fecha_actual and $fecha_final<$fecha_actual){
				$estatus='<a href="?'.codificar('vista=resultado_concurso&cod_concurso='.$row['cod_concurso']).'" >Finalizado</a>';
			}

			$td.='<tr class="'.$color.'">';
			$td.='<td>'.$row['cod_concurso'].'</td>';
			$td.='<td>'.$row['tiempo_inicio'].' VEN</td>';
			$td.='<td>'.$row['nombre_corto'].'</td>';
			$td.='<td>'.$estatus.'</td>';
			$td.='</tr>';
		}
		$html='<table class="table table-striped" style="font-size:13px"><tr>
			<th>Cód.</th>
			<th>Inicio</th>
			<th>Nombre</th>
			<th>Estatus</th>
		</tr>'.$td.'</table>';		
		return $html;
	
}
?>
