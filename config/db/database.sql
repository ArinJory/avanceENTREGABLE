CREATE DATABASE maquillaje_db;
USE maquillaje_db;

CREATE TABLE productos_maquillaje(
	id	int	auto_increment	primary key,
    nombre varchar(100),
    marca varchar(100),
    precio decimal(10,2),
    stock int
)ENGINE=INNODB;

