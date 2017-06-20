
	var i=0;
	$(function() {
			$("#minimoa").lemez_aceptar("numero","");
			$("#minimor").lemez_aceptar("numero","");

	});

	function agrega_detalle() {
		// body...



		role=document.getElementById('roles');
			re=role.value.split('*');

			if(role.value == '-'){
				alert('Seleccione un rol');
				role.focus();
			}else{


		if(verifica_repetido(re[0]) == 1){
			alert('Ya esta agregado el rol');
		}else{


		ta=document.getElementById('detalle');
		tr=ta.insertRow(0);
		td=tr.insertCell(0);
		td1=tr.insertCell(1);
		tr.setAttribute ("id","tr_"+i);

	

		td.innerHTML='<input type="hidden" id="rol_'+i+'" name="rol[]" value="'+re[0]+'"><span class="glyphicon glyphicon-ok"></span> '+re[1];
		td1.innerHTML='<a class="btn" onclick="borrar(tr_'+i+')"> <span class="glyphicon glyphicon-remove-sign"></span></a>';
		i++;
			}
		}	
	}

	function verifica_repetido(dato){
		// alert(dato+' -> '+i);
		 	var k=0;
		 	var t=0;
		for(k=0; k <i; k++ ){
			f=document.getElementById('rol_'+k);
			if(dato == f.value){
				t++;
			}else{

			}
		}
		return t;
	}


	function borrar(k){


		ta=document.getElementById('detalle');
		ta.deleteRow(k.rowIndex);
		i--;
	}

	
	