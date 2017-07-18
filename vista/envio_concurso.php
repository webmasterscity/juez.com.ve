<script>
$(function() {
	cargar_resultado();
	setInterval(cargar_resultado,5000);
});

function cargar_resultado(){
	$("#resultado_div").load("tabla_resultado_profesor.php?cod_concurso=<?php echo $_GET['cod_concurso']; ?>");
}
</script>
<div id="resultado_div">

</div>
