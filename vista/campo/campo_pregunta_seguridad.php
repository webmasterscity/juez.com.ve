<?php
require_once("modelo/class_pregunta_seguridad.php");
class campo_pregunta_seguridad extends pregunta_seguridad{
		
		public function preguntas_secretas(){
			
			require_once("modelo/class_configurar.php");
			$configurar = new configurar;
			$configurar->consultar();
			$row=$configurar->row();
			$salida.='<div class="col-md-6">';
		
			for($i=0 ; $i<$row['pregunta_crear'] ; $i++){
				$salida.='
			
				<div class="row">
					<div class="col-md-6">
						<label>Pregunta '.($i+1).'  <span style="color:red" title="Campo obligatorio">(*)</span></label> 
						<input required name="pregunta['.$this->cod_pregunta_seguridad[$i].']" type="text" class="form-control" value="'.$this->pregunta[$i].'">
					</div>
					<div class="col-md-6">
						<label>Respuesta secreta '.($i+1).'  <span style="color:red" title="Campo obligatorio">(*)</span></label>
						<input required type="password" name="respuesta['.$this->cod_pregunta_seguridad[$i].']" class="form-control" value="'.$this->respuesta[$i].'">
					</div>
				</div>
			
				';
			}
			
			$salida.='</div>';
			return $salida;
		}
	}
?>
