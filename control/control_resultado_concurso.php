<?php

	//INCLUIMOS LAS CLASES
	require_once("vista/resultado_concurso.php");
	include_once("modelo/class_concurso.php");
	//METODOS DE ENTRADA
	$evento = 	$_POST["evento"] ? $_POST["evento"] : $_GET["evento"];
	$cod_problema= $_GET["cod_problema"];
	$nombre=$_POST["nombre"];
	$limite_tiempo=$_POST["limite_tiempo"];
	$limite_memoria=$_POST["limite_memoria"];
	$texto_problema=$_FILES["texto_problema"];
	$texto_problema_viejo=$_POST["texto_problema_viejo"];
	$tipo_texto_problema=$_POST["tipo_texto_problema"];
	$cod_usuario=$_SESSION['cod_usuario'];
	$codigo_fuente=$_POST['codigo_fuente'];
	
	$cod_lenguaje_prog=$_POST["cod_lenguaje_prog"];
	$cod_concurso=$_GET['cod_concurso'];
	//INSTANCIAMOS EL OBJETO Y APLICAMOS LOS METODOS SET
	
		$participar = new resultado_concurso;
		
		$participar->set_cod_problema($cod_problema);
		$participar->set_nombre($nombre);
		$participar->set_limite_tiempo($limite_tiempo);
		$participar->set_limite_memoria($limite_memoria);
		$participar->set_texto_problema($texto_problema,$texto_problema_viejo);			
		$participar->set_cod_problema($cod_problema);
		$participar->set_codigo_fuente($codigo_fuente);
		$participar->set_cod_lenguaje_prog($cod_lenguaje_prog);
		$participar->set_cod_concurso($cod_concurso);
		$participar->set_cod_equipo($_SESSION['cod_equipo']);
		$participar->tipo='concurso';
		$participar->nombre_equipo="<span style='font-size:15px'>Mi equipo: <b>".$_SESSION['nombre_equipo']."</b></span>";
			
		$html_todo=$participar->resultado_concurso();
		?>
		
