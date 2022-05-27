DROP DATABASE IF EXISTS TekPix2;

CREATE DATABASE IF NOT EXISTS TekPix2;

USE TekPix2;

DROP TABLE IF EXISTS produtos;

CREATE TABLE `produtos` (
  `id` int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(127) NOT NULL,
  `categoria_id` int UNSIGNED NOT NULL,
  `fornecedor_id` int UNSIGNED NOT NULL,
  `preco` int NOT NULL
);

LOCK TABLES `produtos` WRITE;
INSERT INTO `produtos` 
VALUES 
(1,'TekPix 2022', 1, 1 , 300),
(2,'TekPix VideoPRO', 2, 1, 700),
(3,'Sony CoolCam', 1, 2 , 350),
(4,'Nikon MoviePRO', 3, 3, 1200);
UNLOCK TABLES;


DROP TABLE IF EXISTS categorias;

CREATE TABLE `categorias` (
  `id` int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(63) NOT NULL
);

LOCK TABLES `categorias` WRITE;
INSERT INTO `categorias` 
VALUES 
(1,'Camera fotográfica'),
(2,'Camera de video'),
(3,'Camera de cinema');
UNLOCK TABLES;


DROP TABLE IF EXISTS fornecedores;

CREATE TABLE `fornecedores` (
  `id` int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(63) NOT NULL
);

LOCK TABLES `fornecedores` WRITE;
INSERT INTO `fornecedores` 
VALUES 
(1,'Tecnomania'),
(2,'Sony'),
(3,'Nikkon');
UNLOCK TABLES;

DROP TABLE IF EXISTS clientes;

CREATE TABLE `clientes` (
  `id` int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(63) NOT NULL,
  `cpf` char(11) NOT NULL,
  `data_de_nascimento` date NOT NULL
);

LOCK TABLES `clientes` WRITE;
INSERT INTO `clientes` 
VALUES 
(1,'Luiz Henrique', '12345678912', '1999-03-02'),
(2,'Rafael', '32165498732', '1997-06-13'),
(3,'Tiago', '78945612385', '2000-08-19');
UNLOCK TABLES;


DROP TABLE IF EXISTS funcionarios;

CREATE TABLE `funcionarios` (
  `id` int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(63) NOT NULL,
  `cpf` char(11) NOT NULL,
  `data_de_contratacao` date NOT NULL,
  `email` varchar(127) NOT NULL,
  `senha` varchar(63) NOT NULL
);

LOCK TABLES `funcionarios` WRITE;
INSERT INTO `funcionarios` 
VALUES 
(1,'Pedro Jorge', '45689732105', '1999-07-09', 'pedro@hotmail.com', '123456'),
(2,'João', '32167798732', '1992-03-13', 'joao@gmail.com', '12345'),
(3,'Alberto', '78945752385', '2001-09-29', 'alberto@outlook.com', '123456');
UNLOCK TABLES;

DROP TABLE IF EXISTS vendas;

CREATE TABLE `vendas` (
  `id` int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `produto_id` int UNSIGNED NOT NULL,
  `cliente_id` int UNSIGNED NOT NULL,
  `funcionario_id` int UNSIGNED NOT NULL
);

LOCK TABLES `vendas` WRITE;
INSERT INTO `vendas` 
VALUES 
(1, 3, 1, 2),
(2, 2, 3, 1),
(3, 1, 2, 1);
UNLOCK TABLES;

ALTER TABLE `vendas` ADD FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`);

ALTER TABLE `vendas` ADD FOREIGN KEY (`funcionario_id`) REFERENCES `funcionarios` (`id`);

ALTER TABLE `vendas` ADD FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`);

ALTER TABLE `produtos` ADD FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);

ALTER TABLE `produtos` ADD FOREIGN KEY (`fornecedor_id`) REFERENCES `fornecedores` (`id`);



