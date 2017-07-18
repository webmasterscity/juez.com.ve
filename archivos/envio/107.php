CREATE TABLE persona (  cedula varchar(10), nombre varchar(100), apellido varchar(100),cod_ocupacion varchar(3));
CREATE TABLE ocupacion (cod_ocupacion varchar(3),descripcion varchar(100));

INSERT INTO ocupacion VALUES('1','Estudiante');
INSERT INTO ocupacion VALUES('2','Comerciante');
INSERT INTO ocupacion VALUES('3','Diseñadora');

INSERT INTO persona VALUES ('18671986','Leonardo', 'Melendez','1');
INSERT INTO persona VALUES ('18164019','Jesus', 'Romero','2');
INSERT INTO persona VALUES ('23580136','Adriana', 'Vizcaya','3');

SELECT persona.nombre, persona.nombre, persona.apellido, ocupacion.descripcion FROM persona INNER JOIN ocupacion ON ocupacion.cod_ocupacion=persona.cod_ocupacion;