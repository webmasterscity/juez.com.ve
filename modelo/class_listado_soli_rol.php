<?php
//INCLUYE LA CLASE QUE CREA LA CONEXION
include_once("modelo/class_db.php");
// INSTANCIAMOS LA CLASE
class solicitud_cambio_rol extends db{
// CREAMOS LOS ATRIBUTOS
		public $cod_cambio;
		public $nombre;
		public $extensiones;
		public $permitir_envio;
		public $permitir_juez;
		public $factor_tiempo;
		public $comando;		
// CREAMOS LOS METODOS SET		
			public function set_cod_cambio($cod_cambio){
					$this->cod_cambio= $cod_cambio;
			}
		
			public function set_nombre($nombre){
					$this->nombre= $nombre;
			}
		
			public function set_extensiones($extensiones){
					$this->extensiones= $extensiones;
			}

		
			public function set_factor_tiempo($factor_tiempo){
					$this->factor_tiempo= $factor_tiempo;
			}
		
			public function set_comando($comando){
					$this->comando= $comando;
			}
		

	public function registrar(){		
		return parent::ejecutar("INSERT INTO solicitud_cambio_rol (nombre,extensiones,factor_tiempo,comando) VALUES ('$this->nombre','$this->extensiones','$this->factor_tiempo','$this->comando')");
	}
	public function consultar(){		
		$res=parent::ejecutar("SELECT * FROM solicitud_cambio_rol WHERE cod_cambio='$this->cod_cambio'");
		$this->cargar_variables();
		return $res;
	}
	public function listar(){		
		return parent::ejecutar("SELECT * FROM solicitud_cambio_rol WHERE estatus='1'");
	}
	public function listar_admin(){		
		return parent::ejecutar("SELECT * FROM solicitud_cambio_rol ");
	}
	public function eliminar(){		
		return parent::ejecutar("DELETE FROM solicitud_cambio_rol WHERE cod_cambio='$this->cod_cambio'");
	}
	public function modificar(){		
		return parent::ejecutar("UPDATE solicitud_cambio_rol SET nombre='$this->nombre',extensiones='$this->extensiones',factor_tiempo='$this->factor_tiempo',comando='$this->comando' WHERE cod_cambio='$this->cod_cambio'");
	}
	//ESTA FUNCION EXTRAE EL ULTIMO REGISTRO DE LA TABLA
	public function ultimo_id(){
		parent::ejecutar("SELECT MAX(cod_cambio) AS cod_cambio FROM solicitud_cambio_rol");
		$arreglo=$this->row();
		return $arreglo["cod_cambio"];
		}
	//Retornar la cantidad de registros que possee la tabla
	public function cantidad_registros(){
		parent::ejecutar("SELECT COUNT(*) FROM solicitud_cambio_rol");
		$arreglo=$this->row();
		return $arreglo[0];
	}
	public function desactivar(){		
		return parent::ejecutar("UPDATE solicitud_cambio_rol SET estatus=0 WHERE cod_cambio='$this->cod_cambio'");
	}	
	public function activar(){		
		return parent::ejecutar("UPDATE solicitud_cambio_rol SET estatus=1 WHERE cod_cambio='$this->cod_cambio'");
	}	
	public function consulta_por($campo){
		return parent::ejecutar("SELECT * FROM solicitud_cambio_rol WHERE $campo='".$this->$campo."'");
	}
	public function consulta_doble($campo1,$campo2){
		return parent::ejecutar("SELECT * FROM solicitud_cambio_rol WHERE $campo1='".$this->$campo1."' AND $campo2='".$this->$campo2."'");
	}
	public function elimina_por($campo){
		return parent::ejecutar("DELETE FROM solicitud_cambio_rol WHERE $campo='".$this->$campo."'");
	}
	private function cargar_variables(){
		$row=$this->row();
		
		$this->cod_cambio=$row['cod_cambio'];
		$this->nombre=$row['nombre'];
		$this->extensiones=$row['extensiones'];
		$this->factor_tiempo=$row['factor_tiempo'];
		$this->comando=$row['comando'];

	}
}
?>
