<?php
require_once("modelo/class_db.php");
class parametros_problemas extends db{
	private $cod_parametro;
	private $minimo_aprobar;
	private $minimo_rechazar;
	
	public function set_cod_parametro($cod_parametro){
		$this->cod_parametro=$cod_parametro;	
	}
	public function set_minimo_aprobar($minimo_aprobar){
		$this->minimo_aprobar=$minimo_aprobar;
	}
	public function set_minimo_rechazar($minimo_rechazar){
			$this->minimo_rechazar=$minimo_rechazar;
	}
	
	public function editar(){

			return parent::ejecutar("UPDATE parametros_problemas SET minimo_aprobado='$this->minimo_aprobar', minimo_rechazado='$this->minimo_rechazar' where cod_parametro='1'");
	}
	public function eliminar_detalle(){
		return parent::ejecutar("delete from detalle_parametro_problemas");
	}

	public function registrar_detalle($p1){
		return parent::ejecutar("insert into detalle_parametro_problemas value(0,1,'$p1')");
	}
	public function consultar(){
		return parent::ejecutar("SELECT * FROM parametros_problemas");
	}
	public function consultar_detalle(){
		return parent::ejecutar("SELECT * FROM detalle_parametro_problemas as dp, tipo_usuario as tp where dp.cod_parametro=1 AND tp.cod_tipo_usuario=dp.cod_rol");
	}
	
}
?>
