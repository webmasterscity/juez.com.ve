<?php
//INCLUYE LA CLASE QUE CREA LA CONEXION
include_once("modelo/class_db.php");
// INSTANCIAMOS LA CLASE
class det_envio_comparacion extends db{
// CREAMOS LOS ATRIBUTOS
		public $cod;
		public $cod_envio;
		public $salida;
		public $salida_esperada;
// CREAMOS LOS METODOS SET		
			public function set_cod_envio($cod_envio){
					$this->cod_envio= $cod_envio;
			}

			public function set_salida($salida){
					$this->salida= $salida;
			}
		
			public function set_salida_esperada($salida_esperada){
					$this->salida_esperada= $salida_esperada;
			}
		
			

	public function registrar(){		
		return parent::ejecutar("INSERT INTO det_envio_comparacion (cod_envio,salida,salida_esperada) VALUES ('$this->cod_envio','$this->salida','$this->salida_esperada')");
	}
	public function consultar(){		
		return parent::ejecutar("SELECT det_envio_comparacion.* FROM det_envio_comparacion  INNER JOIN envio USING(cod_envio) WHERE det_envio_comparacion.cod_envio='$this->cod_envio'");
	}
	

}
?>
