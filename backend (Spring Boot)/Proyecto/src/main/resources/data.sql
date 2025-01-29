INSERT INTO users (nombre, password, email, telefono, direccion, rol) VALUES 
('iago', '123456B', 'iagovila17@gmail.com', 607048866, 'Calle 123, A Coruña', 'ADMIN'),
('Juan', '123456A', 'usuario2@email.com', 987654321, 'Avenida 456, Madrid', 'USER');

-- Insertar categorias principales
INSERT INTO categorias (descripcion, nombre) 
VALUES 
('Ropa y accesorios para hombres', 'Hombre'),
('Ropa y accesorios para mujeres', 'Mujer'),
('Ropa para ninos', 'Ninos'),
('Ropa para ninas', 'Ninas'),
('Ropa para bebes', 'Bebes'),
('Productos para el hogar', 'Home');


INSERT INTO subcategorias (nombre, descripcion) VALUES 
('sudaderas', 'sudaderas para hombres'),
('polos', 'polos para hombres'),
('camisetas', 'camisetas para hombres'),
('camisas', 'camisas para hombres'),
('jeans', 'jeans para hombres'),
('ropainterior', 'ropainterior para hombres'),
('zapatos', 'zapatos para hombres'),
('accesorios', 'accesorios para hombres'),

('chaquetas', 'chaquetas para mujeres'),
('sudaderas', 'sudaderas para mujeres'),
('vestidos', 'vestidos para mujeres'),
('pijamas', 'pijamas para mujeres'),
('bolos', 'bolos para mujeres'),
('zapatos', 'zapatos para mujeres'),
('accesorios', 'accesorios para mujeres'),

('6anos', 'hasta 6 anos para ninas'),
('14anos', 'hasta 14 anos para ninas'),

('6anos', 'hasta 6 anos para ninos'),
('14anos', 'hasta 14 anos para ninos'),

('6anos', 'hasta 6 anos para bebes'),
('14anos', 'hasta 14 anos para bebes'),

('Dormitorio', 'Decoracion para dormitorio'),
('Salon', 'Salon'),
('comedor', 'comedor'),
('cocina', 'Decoracion para cocina'),
('bano', 'bano'),
('recibidor', 'recibidor'),
('fragancia', 'fragancia');
