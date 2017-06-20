<?php
	require_once("modelo/class_informacion.php");
	$informacion = new informacion;
	$informacion->set_cod_informacion(2);
	$informacion->consultar();
	$row_informacion=$informacion->row();
	
?>
<div class="panel panel-default">
	<div class="panel-heading center">
		<?php echo $_SESSION['nombre_vista']; ?>
	</div>
	<div class="panel-body justificar">

<?php echo $row_informacion['descripcion'] ?>

