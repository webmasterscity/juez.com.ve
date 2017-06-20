<div class="panel panel-default">
	<div class="panel-heading" style="text-align:center">
		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-md-6"><span style="font-size:18px"></span> Tema</span></div>
			
		</div>
	</div>
<div class="panel panel-body">	
	<form method="POST">
Elije un tema:
	<select name="tema" class="form-control">
		<option value="">Elige</option>
		<option value="leo-blue.css" <?php if($tema=='leo-blue.css') echo "selected"; ?> >Original</option>
		<option value="blue-dark.css" <?php if($tema=='blue-dark.css') echo "selected"; ?> >Azul oscuro</option>
		<option value="blue-grey.css" <?php if($tema=='blue-grey.css') echo "selected"; ?> >Azul gris</option>
		<option value="green-blue.css"	<?php if($tema=='green-blue.css') echo "selected"; ?> >Verde azul</option>
		<option value="green-dark.css"	<?php if($tema=='green-dark.css') echo "selected"; ?> >Verde oscuro</option>
		<option value="green-grey.css"	<?php if($tema=='green-grey.css') echo "selected"; ?> >Verde gris</option>
		<option value="orange-blue.css"	<?php if($tema=='orange-blue.css') echo "selected"; ?> >Naranja azul</option>
		<option value="orange-grey.css"	<?php if($tema=='orange-grey.css') echo "selected"; ?> >Naranja gris</option>
		<option value="orange-violet.css"	<?php if($tema=='orange-violet.css') echo "selected"; ?> >Naranja violeta</option>
		<option value="pink-blue.css"	<?php if($tema=='pink-blue.css') echo "selected"; ?> >Rosado azul</option>
		<option value="pink-brown.css"	<?php if($tema=='pink-brown.css') echo "selected"; ?> >Rosado marrón</option>
		<option value="pink-dark.css"	<?php if($tema=='pink-dark.css') echo "selected"; ?> >Rosado oscuro</option>
		<option value="pink-green.css"	<?php if($tema=='pink-green.css') echo "selected"; ?> >Rosado verde</option>
		<option value="pink-grey.css"	<?php if($tema=='pink-grey.css') echo "selected"; ?> >Rosado gris</option>
		<option value="pink-violet.css"	<?php if($tema=='pink-violet.css') echo "selected"; ?> >Rosado violeta</option>
		<option value="red-dark.css"	<?php if($tema=='red-dark.css') echo "selected"; ?> >Rojo oscuro</option>
		<option value="red-grey.css"	<?php if($tema=='red-grey.css') echo "selected"; ?> >Rojo gris</option>
		<option value="yellow-blue.css"	<?php if($tema=='yellow-blue.css') echo "selected"; ?> >Amarillo azul</option>
		<option value="yellow-dark.css"	<?php if($tema=='yellow-dark.css') echo "selected"; ?> >Amarillo oscuro</option>
		<option value="yellow-green.css"	<?php if($tema=='yellow-green.css') echo "selected"; ?> >Amarillo verde</option>
		<option value="yellow-grey.css"	<?php if($tema=='yellow-grey.css') echo "selected"; ?> >Amarillo gris</option>
	</select><br>
	<?php echo botones('modificar'); ?>
	</form>
</div>
