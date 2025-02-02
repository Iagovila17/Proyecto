INSERT INTO users (nombre, password, email, telefono, direccion, rol) VALUES 
('iago', '123456B', 'iagovila17@gmail.com', 607048866, 'Calle 123, A Coruña', 'ADMIN'),
('pablo', '654321C', 'pablito@gmail.com', 603248546, 'Calle fernandez 1, Barcelona', 'CLIENTE'),
('Juan', '129856A', 'usuario2@email.com', 987654321, 'Avenida 456, Madrid', 'USER');

-- Insertar categorias principales
INSERT INTO categorias (descripcion, nombre) 
VALUES 
('Ropa y accesorios para hombres', 'Hombre'),
('Ropa y accesorios para mujeres', 'Mujer'),
('Ropa para ninos', 'Ninos'),
('Ropa para ninas', 'Ninas'),
('Ropa para bebes', 'Bebes'),
('Productos para el hogar', 'Home');


INSERT INTO subcategorias (nombre, descripcion, categoria_id) VALUES 
('sudaderas', 'sudaderas para hombres', 1),
('polos', 'polos para hombres', 1),
('camisetas', 'camisetas para hombres', 1),
('camisas', 'camisas para hombres', 1),
('jeans', 'jeans para hombres', 1),
('ropainterior', 'ropainterior para hombres', 1),
('zapatos', 'zapatos para hombres', 1),
('accesorios', 'accesorios para hombres', 1),

('chaquetas', 'chaquetas para mujeres', 2),
('sudaderas', 'sudaderas para mujeres', 2),
('vestidos', 'vestidos para mujeres', 2),
('pijamas', 'pijamas para mujeres', 2),
('bolos', 'bolos para mujeres', 2),
('zapatos', 'zapatos para mujeres', 2),
('accesorios', 'accesorios para mujeres', 2),

('6anos', 'hasta 6 anos para ninos', 3),
('14anos', 'hasta 14 anos para ninos', 3),

('6anos', 'hasta 6 anos para ninas', 4),
('14anos', 'hasta 14 anos para ninas', 4),

('6anos', 'hasta 6 anos para bebes', 5),
('14anos', 'hasta 14 anos para bebes', 5),

('Dormitorio', 'Decoracion para dormitorio', 6),
('Salon', 'Salon', 6),
('comedor', 'comedor', 6),
('cocina', 'Decoracion para cocina', 6),
('bano', 'bano', 6),
('recibidor', 'recibidor', 6),
('fragancia', 'fragancia', 6);

INSERT INTO productos (cantidad_stock, precio, subcategoria_id, descripcion, imagen_url, material, nombre, talla) VALUES 

-- Sudaderas para hombres
(50, 29.99, 1, 'Sudadera con capucha y bolsillos', 'url_imagen_1.jpg', 'Algodon', 'Sudadera con capucha', 'M'),
(30, 35.99, 1, 'Sudadera deportiva sin capucha', 'url_imagen_2.jpg', 'Poliester', 'Sudadera deportiva', 'L'),

-- Polos para hombres
(40, 24.99, 2, 'Polo clasico de algodon', 'url_imagen_3.jpg', 'Algodon', 'Polo clasico', 'S'),
(25, 27.99, 2, 'Polo con cuello en V', 'url_imagen_4.jpg', 'Poliester', 'Polo cuello V', 'XL'),

-- Camisetas para hombres
(60, 14.99, 3, 'Camiseta basica de manga corta', 'url_imagen_5.jpg', 'Algodon', 'Camiseta basica', 'M'),
(35, 18.99, 3, 'Camiseta con estampado', 'url_imagen_6.jpg', 'Poliester', 'Camiseta estampada', 'L'),

-- Vestidos para mujeres
(20, 45.99, 11, 'Vestido largo de fiesta', 'url_imagen_7.jpg', 'Seda', 'Vestido elegante', 'M'),
(15, 39.99, 11, 'Vestido casual corto', 'url_imagen_8.jpg', 'Algodon', 'Vestido casual', 'S'),

-- Zapatos para mujeres
(25, 59.99, 14, 'Zapatos de tacon alto', 'url_imagen_9.jpg', 'Cuero', 'Tacones elegantes', 'SIZE_39'),
(30, 49.99, 14, 'Zapatillas deportivas', 'url_imagen_10.jpg', 'Textil', 'Zapatillas running', 'SIZE_40'),

-- Ropa para niños
(50, 19.99, 16, 'Camiseta con estampado infantil', 'url_imagen_11.jpg', 'Algodon', 'Camiseta infantil', 'S'),
(40, 22.99, 16, 'Pantalon vaquero', 'url_imagen_12.jpg', 'Denim', 'Jeans nino', 'M'),

-- Ropa para bebés
(35, 14.99, 20, 'Body para bebe', 'url_imagen_13.jpg', 'Algodon', 'Body bebe', 'S'),
(20, 19.99, 20, 'Pijama de algodon', 'url_imagen_14.jpg', 'Algodon', 'Pijama bebe', 'M'),

-- Productos para el hogar (sin talla)
(15, 99.99, 22, 'Juego de sabanas de seda', 'url_imagen_15.jpg', 'Seda', 'Sabanas premium', NULL),
(20, 79.99, 23, 'Sofa de 3 plazas', 'url_imagen_16.jpg', 'Tela', 'Sofa moderno', NULL);
