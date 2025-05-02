CREATE DATABASE IF NOT EXISTS maquillaje_db;
USE maquillaje_db;

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2),
    stock INT,
    marca VARCHAR(50),
    imagen VARCHAR(255)
);

INSERT INTO productos (nombre, descripcion, precio, stock, marca, imagen) VALUES
('Delineador de Cejas', 'Punta fina, larga duración', 19.80, 22, 'Essence', 'ceja.jpg'),
('Gloss Labial', 'Brillo hidratante con aroma frutal', 21.00, 35, 'Fenty Beauty', 'gloss.jpg'),
('Iluminador Facial', 'Brillo natural para mejillas y rostro', 29.00, 18, 'Becca', 'iluminador.jpg'),
('Spray Fijador', 'Fija tu maquillaje por horas', 33.90, 16, 'MAC', 'cejas.jpg'),
('Polvo Compacto', 'Controla brillo, acabado mate', 34.50, 25, 'Rimmel', 'polvo compacto.jpg'),
('Prebase de Maquillaje', 'Minimiza poros y alisa piel', 36.20, 14, 'Smashbox', 'prebase.jpg'),
('Corrector', 'Cobertura alta, larga duración', 24.50, 20, 'Maybelline', 'Corrector.png'),
('Paleta de Sombras', '12 tonos nude altamente pigmentados', 59.99, 10, 'Urban Decay', 'paleta de sombras.jpg'),
('Esmalte', 'Color duradero y brillante', 15.00, 40, 'Sally Hansen', 'esmalte.jpg');

SELECT * FROM productos;