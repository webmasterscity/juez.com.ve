

            <!--END TITLE & BREADCRUMB PAGE--><!--BEGIN CONTENT-->
            <div class="page-content">
                <div id="tab-general">
                    <div id="sum_box" class="row mbl">
					<?php echo cajas_estadisticas(); ?>
                    </div>
                    <div class="row mbl">
                        <div class="col-lg-7">
								<?php echo estadisticas_lenguajes(); ?>
                            
                        </div>
                        <div class="col-lg-5">
								<?php echo timeline_concursos();?>
                        </div>
                    </div>

                </div>
            </div>



<?php

function cajas_estadisticas(){
	require_once("modelo/class_envio_entrenamiento.php");
	require_once("modelo/class_concurso.php");
	require_once("modelo/class_problema.php");
	require_once("modelo/class_usuario.php");
	$concurso 			 = new concurso;
	$envio_entrenamiento = new envio_entrenamiento;
	$problema = new problema;
	$usuario = new usuario;
	$total_concurso		 =$concurso->listar();
	$total_envio_entrenamiento=$envio_entrenamiento->listar_envio_entrenamiento();
	$total_problema	=$problema->listar();
	$total_usuario=$usuario->listar();
	
	$html.='
	                        <div class="col-sm-6 col-md-3">
                            <div class="panel profit db mbm">
                                <div class="panel-body"><p class="icon"><i class="icon fa fa-check"></i></p><h4 class="value"><span >'.$total_envio_entrenamiento.'</span></h4>

                                    <p class="description">Envios</p>

                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-3">
                            <div class="panel income db mbm">
                                <div class="panel-body"><p class="icon"><i class="icon fa fa-trophy"></i></p><h4 class="value"><span>'.$total_concurso.'</span></h4>

                                    <p class="description">Concursos</p>

                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-3">
                            <div class="panel task db mbm">
                                <div class="panel-body"><p class="icon"><i class="icon fa fa-keyboard-o"></i></p><h4 class="value"><span>'.$total_problema.'</span></h4>

                                    <p class="description">Problemas</p>

                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-3">
                            <div class="panel visit db mbm">
                                <div class="panel-body"><p class="icon"><i class="icon fa fa-group"></i></p><h4 class="value"><span>'.$total_usuario.'</span></h4>

                                    <p class="description">Usuarios</p>
                                </div>
                            </div>
                        </div>';
                        return $html;
	}

function timeline_concursos(){
	require_once("modelo/class_concurso.php");
	$concurso = new concurso;
	$concurso->listar();
	while($row_concurso = $concurso->row()){
		 $html_concurso.=' <article class="timeline-entry">
                                    <div class="timeline-entry-inner">
                                        <time datetime="2014-01-10T03:45" class="timeline-time"><span>'.date('h:i:s',strtotime($row_concurso['tiempo_inicio'])).'</span><span>'.date('d-m-Y',strtotime($row_concurso['tiempo_inicio'])).'</span></time>
                                        <div class="timeline-icon bg-blue"><p class="icon"><i class="icon fa fa-trophy"></i></p></div>
                                        <div class="timeline-label bg-blue"><h4 class="timeline-title">'.$row_concurso['nombre_corto'].'</h4>

                                            <p>'.$row_concurso['nombre'].'</p></div>
                                    </div>
                                </article>';
		}
	$html.='
	
   
	                            <div class="timeline-centered timeline-sm" style="background:#F6F6F6">
													<div class="page-title-breadcrumb ">
												<div class="page-header pull-left">
													<h4 class="mbs">Concursos</h4>
												</div>
												<div class="clearfix"></div>
											</div>
	                           <br>

                                '.$html_concurso.'
                            </div>
       
                        ';
	return $html;
}

function estadisticas_lenguajes(){
	require_once("modelo/class_envio_entrenamiento.php");
	$envio = new envio_entrenamiento;
	if($envio->uso_lenguaje_prog()>0){
		while($row=$envio->row()){
			$html_interno.='<span>'.$row['nombre'].' <small class="pull-right text-muted">'.$row['porcentaje'].'%</small>
			<div class="progress progress-sm">
				<div role="progressbar" aria-valuenow="'.$row['porcentaje'].'" aria-valuemin="0" aria-valuemax="100" style="width: '.$row['porcentaje'].'%;" class="progress-bar progress-bar-orange"><span class="sr-only">40% Complete (success)</span>
				</div>
			</div>
			</span>';
			}
		}
		$html.='  <div class="panel">
                                <div class="panel-body">
                                    <div class="row">

                                        <div class="col-md-12">
                                        										<h4 class="mbs">Lenguajes de Programación</h4>
										<p class="help-block">Estadisticas de los lenguajes mas usados por los usuarios...</p>
											<h4 class="mbm">Lenguaje</h4>
											'.$html_interno.'</div>
                                    </div>
                                </div>
                            </div>
                            
								';
           return $html;
	
}
?>
