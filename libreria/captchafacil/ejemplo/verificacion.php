<?php
	  session_start();
	  if(strtoupper($_REQUEST["captcha"]) == $_SESSION["captcha"]){
		 // REMPLAZO EL CAPTCHA USADO POR UN TEXTO LARGO PARA EVITAR QUE SE VUELVA A INTENTAR
		 $_SESSION["captcha"] = md5(rand()*time());
	 	 // INSERTA EL C�DIGO EXITOSO AQUI
		 echo "aprobado";
	  }else{
		 // REMPLAZO EL CAPTCHA USADO POR UN TEXTO LARGO PARA EVITAR QUE SE VUELVA A INTENTAR
		 $_SESSION["captcha"] = md5(rand()*time());
	 	 // INSERTA EL C�DIGO DE ERROR AQU�
		 echo "reprobado";
	  }
?>