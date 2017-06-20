<?php
require_once("vista/campo/campo_pregunta_seguridad.php");

class vista_pregunta_seguridad extends campo_pregunta_seguridad{
	
	
	public function formulario($tipo){

		switch($tipo){
			case 'modificar': {
				$this->consultar();
				$boton=botones('actualizar');
				$titulo='Modificar Preguntas de Seguridad';
			}break;
			case 'registrar':{
				$boton=botones('registrar');
				$titulo='Registrar Preguntas de Seguridad';
			}break;
		}
		$html.='
		
			<div class="panel panel-default">
			
			<div class="panel-heading center">
				<div class="row">
					<div class="col-md-3"></div>
					<div class="col-md-6"><span style="font-size:18px"><span class="glyphicon glyphicon-user"></span> '.$titulo.'</span></div>
				</div>
			</div>
				<br>
			<div class="panel-body">
				<form method="post">
					<div class="row">
						<div class="col-md-3"></div>
							'.$this->preguntas_secretas().'
						
					</div>
						<div class="row"><br>
							<div class="col-md-3"></div>
							'.$boton.'
						</div>		
					<br>
				</form>
			</div>
		
			';
		return $html;
		
		
	}
	
}
?>
