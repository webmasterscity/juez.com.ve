<?php
//INCLUYE LA CLASE QUE CREA LA CONEXION
@include_once("modelo/class_db.php");
// INSTANCIAMOS LA CLASE
class det_problema_lenguaje_prog extends db{
// CREAMOS LOS ATRIBUTOS
		public $cod_problema;
		public $cod_lenguaje_prog;
	
// CREAMOS LOS METODOS SET		
		public function set_cod_problema($cod_problema){
			$this->cod_problema= filter_var($cod_problema,FILTER_SANITIZE_NUMBER_INT);
		}
		public function set_cod_lenguaje_prog($cod_lenguaje_prog){
			$this->cod_lenguaje_prog= filter_var($cod_lenguaje_prog,FILTER_SANITIZE_NUMBER_INT);
		}
		
		public function registrar(){
			return parent::ejecutar("INSERT INTO det_problema_lenguaje_prog VALUES (".$this->cod_lenguaje_prog.",".$this->cod_problema.")");
		
		}
		public function elimina_por($campo){
			return parent::ejecutar("DELETE FROM det_problema_lenguaje_prog WHERE $campo='".$this->$campo."'");
		}
		public function consultar(){
			return parent::ejecutar("SELECT * FROM det_problema_lenguaje_prog WHERE cod_problema='".$this->cod_problema."'");

		}

		

}
?>
