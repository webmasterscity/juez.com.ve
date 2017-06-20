<?php
//INCLUYE LA CLASE QUE CREA LA CONEXION
include_once("modelo/class_db.php");
// INSTANCIAMOS LA CLASE

class cambio_rol extends db{
// CREAMOS LOS ATRIBUTOS
		public $cod_cambio;
		public $cod_usuario;
		public $cod_rol;
		public $documento;
		public $motivo;
		public $estatus;
	
// CREAMOS LOS METODOS SET		
			public function set_cod_cambio($cod_cambio){
					$this->cod_cambio= filter_var($cod_cambio,FILTER_SANITIZE_NUMBER_INT);
			}
			public function set_cod_usuario($cod_usuario){
					$this->cod_usuario= $cod_usuario;
			}

			public function set_cod_rol($cod_rol){
					$this->cod_rol= $cod_rol;
			}

			public function set_documento($documento){
					$this->documento= $documento;

					
			}

			public function set_motivo($motivo){
					$this->motivo= $motivo;
			}
		
			public function set_estatus($estatus){
					$this->estatus= $estatus;
			}
		

	public function registrar(){
		return parent::ejecutar("INSERT INTO solicitud_cambio_rol (cod_usuario,cod_rol,documento,motivo,estatus,fecha) VALUES ('$this->cod_usuario','$this->cod_rol','$this->documento','$this->motivo','1','".date('Y-m-d')."')");
	}
	public function consultar(){		
		return parent::ejecutar("SELECT * FROM solicitud_cambio_rol where cod_cambio='$this->cod_cambio' ");
		
	}
	public function listar(){		
		return parent::ejecutar("SELECT * FROM solicitud_cambio_rol ");
	}

	public function listar_admin(){		
		return parent::ejecutar("SELECT *,tp.nombre as nombre_tipo,p.nombre as nombre_p, sc.estatus as estatus_soli FROM solicitud_cambio_rol as sc , usuario as usa, persona as p , tipo_usuario as tp
			where usa.cod_usuario=sc.cod_usuario AND p.cedula=usa.cedula AND tp.cod_tipo_usuario=sc.cod_rol AND sc.estatus= 1");
	}

	public function consultar_admin(){		
		return parent::ejecutar("SELECT *,tp.nombre as nombre_tipo,p.nombre as nombre_p, sc.estatus as estatus_soli 
			FROM solicitud_cambio_rol as sc , usuario as usa, persona as p , tipo_usuario as tp
			where  sc.cod_cambio='$this->cod_cambio' AND usa.cod_usuario=sc.cod_usuario AND p.cedula=usa.cedula AND tp.cod_tipo_usuario=sc.cod_rol ");
	}
	
	public function eliminar(){		
		return parent::ejecutar("DELETE FROM solicitud_cambio_rol WHERE cod_cambio='$this->cod_cambio'");
	}
	public function modificar(){		
		return parent::ejecutar("UPDATE solicitud_cambio_rol SET cod_usuario='$this->cod_usuario',cod_rol='$this->cod_rol' WHERE cod_cambio='$this->cod_cambio'");
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
	public function operacion($esta,$observa){		
		return parent::ejecutar("UPDATE solicitud_cambio_rol SET estatus='$esta' , observacion='$observa' WHERE cod_cambio='$this->cod_cambio'");
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
	
}
?>
