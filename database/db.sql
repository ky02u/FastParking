create database proyecto2;
use proyecto2;
create table Cliente (
	id_cliente int(10) NOT NULL,
	nombre char (60) not null ,
	apellido char (60) not null,
	tipo_documento char(60) not null,
	documento varchar(60) not null,
	telefono varchar(60) not null,	
	correo varchar(60) not null,
	usuario varchar(60) not null,
	password varchar(100) not null		
);
alter table Cliente
    ADD PRIMARY KEY (id_cliente);

ALTER TABLE Cliente
    MODIFY id_cliente INT(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
    
create table Vehiculo (
	id_vehiculo int(10) NOT NULL,
	placa varchar(100) not null,
	tarjeta_propiedad varchar(60) not null,
	fechaEntrada datetime,
    id_cliente int(10),
    CONSTRAINT fk_cliente FOREIGN KEY(id_cliente) REFERENCES Cliente(id_cliente)
    
);
alter table Vehiculo
    ADD PRIMARY KEY (id_vehiculo);

ALTER TABLE Vehiculo
    MODIFY id_vehiculo INT(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

	create table Plaza (
	id_plaza int(10) NOT NULL,
	localizacion char (60) not null ,	
	tipo_servicio char(60) not null,
    nivel char(60) not null,
    estado char(60) not null
);
alter table Plaza
    ADD PRIMARY KEY (id_plaza);

ALTER TABLE Plaza
    MODIFY id_plaza INT(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

Create table reserva (
id_reserva int(10) NOT NULL AUTO_INCREMENT,
fecha date  not null,
hora time not null,
);
alter table reserva
    ADD PRIMARY KEY (id_reserva);

create table pago (
	id_pago int(10) NOT NULL,
	costo int(30) NOT NULL,
    id_cliente int(10),
    CONSTRAINT fk_cliente FOREIGN KEY(id_cliente) REFERENCES Cliente(id_cliente)
    
);	
alter table pago
    ADD PRIMARY KEY (id_pago);
