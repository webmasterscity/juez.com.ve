<?php
	$cne = new cne;
	$cedula=$_GET['c'];
	$nacionalidad=$_GET['n'];
	if($cedula and $nacionalidad){
	$cne->get_datos($nacionalidad,$cedula);
	}
class cne {
	public $nombre,
			$apellido;
			
    public function get_datos($nac, $ci) {
        $resource = file_get_contents('http://www.cne.gov.ve/web/registro_electoral/ce.php?nacionalidad='.$nac.'&cedula='.$ci);
        $text = strip_tags($resource);
        $findme = 'SERVICIO ELECTORAL'; // Identifica que si es población Votante
        $pos = strpos($text, $findme);

        $findme2 = 'ADVERTENCIA'; // Identifica que si es población Votante
        $pos2 = strpos($text, $findme2);

        if ($pos == TRUE AND $pos2 == FALSE) {
			
            // Codigo buscar votante
            $rempl = array('Cédula:', 'Nombre:', 'Estado:', 'Municipio:', 'Parroquia:', 'Centro:', 'Dirección:', 'SERVICIO ELECTORAL', 'Mesa:');
            
            $r = trim(str_replace($rempl, '|', $this->limpiarCampo($text)));
            $resource = explode("|", $r);
            
            $datos = explode(" ", $this->limpiarCampo($resource[2]));
            $datoJson = array('error' => 0, 'nacionalidad' => $nac, 'cedula' => $ci, 'nombres' => $datos[0] . ' ' . $datos[1], 'apellidos' => $datos[2] . ' ' . $datos[3], 'inscrito' => 'SI', 'cvestado' =>$this->limpiarCampo($resource[3]), 'cvmunicipio' => $this->limpiarCampo($resource[4]), 'cvparroquia' => $this->limpiarCampo($resource[5]), 'centro' => $this->limpiarCampo($resource[6]), 'direccion' => $this->limpiarCampo($resource[7]));
        } elseif ($pos == FALSE AND $pos2 == FALSE) {
            // Codigo buscar votante
            $rempl = array('Cédula:', 'Primer Nombre:', 'Segundo Nombre:', 'Primer Apellido:', 'Segundo Apellido:', 'ESTATUS');
            $r = trim(str_replace($rempl, '|', $text));
            $resource = explode("|", $r);
            $datoJson = array('error' => 0, 'nacionalidad' => $nac, 'cedula' => $ci, 'nombres' => $this->limpiarCampo($resource[2]) . ' ' . $this->limpiarCampo($resource[3]), 'apellidos' => $this->limpiarCampo($resource[4]) . ' ' . $this->limpiarCampo($resource[5]), 'inscrito' => 'NO');
        } elseif ($pos == FALSE AND $pos2 == TRUE) {
            $datoJson = array('error' => 1, 'nacionalidad' => $nac, 'cedula' => $ci, 'nombres' => NULL, 'apellidos' => NULL, 'inscrito' => 'NO');
        }
        
        echo json_encode($datoJson);
    }


    
    public function limpiarCampo($valor) {
        $rempl = array('\n', '\t');
        $r = trim(str_replace($rempl, ' ', $valor));
        return str_replace("\r", "", str_replace("\n", "", str_replace("\t", "", $r)));
    }
    
}
?>
