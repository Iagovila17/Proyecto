-- Insertar un usuario
-- Insertar usuarios adicionales
INSERT INTO users (nombre, email, password, direccion, telefono, rol, fechaRegistro) VALUES 
('Iago Vila', 'iagovila17@gmail.com', '$2a$10$OLFtHR1GqCSvZYtMHU2gv.9SYrBvlc6gKYD4eIZsPlPGenKzs9CNi', 'Rua Boa Vista', '607048861', 'ADMIN', NOW()),
('Juan Pérez', 'juan@example.com', '$2a$10$OLFtHR1GqCSvZYtMHU2gv.9SYrBvlc6gKYD4eIZsPlPGenKzs9CNi', 'Calle Falsa 123', '123456789', 'USER', NOW()),
('Ana López', 'ana.lopez@example.com', '$2a$10$OLFtHR1GqCSvZYtMHU2gv.9SYrBvlc6gKYD4eIZsPlPGenKzs9CNi', 'Av. Central 10', '645123789', 'USER', NOW()),
('Carlos Ruiz', 'carlos.ruiz@example.com', '$2a$10$OLFtHR1GqCSvZYtMHU2gv.9SYrBvlc6gKYD4eIZsPlPGenKzs9CNi', 'Calle Norte 8', '667543219', 'USER', NOW()),
('Lucía Gómez', 'lucia.gomez@example.com', '$2a$10$OLFtHR1GqCSvZYtMHU2gv.9SYrBvlc6gKYD4eIZsPlPGenKzs9CNi', 'Plaza Sol 5', '698123456', 'USER', NOW()),
('Pedro Martínez', 'pedro.m@example.com', '$2a$10$OLFtHR1GqCSvZYtMHU2gv.9SYrBvlc6gKYD4eIZsPlPGenKzs9CNi', 'Camino Real 1', '612345678', 'USER', NOW()),
('Marta Torres', 'marta.t@example.com', '$2a$10$OLFtHR1GqCSvZYtMHU2gv.9SYrBvlc6gKYD4eIZsPlPGenKzs9CNi', 'Calle Luna 3', '634567891', 'USER', NOW()),
('Javier Peña', 'javier.p@example.com', '$2a$10$OLFtHR1GqCSvZYtMHU2gv.9SYrBvlc6gKYD4eIZsPlPGenKzs9CNi', 'Av. del Mar 14', '678912345', 'USER', NOW()),
('Elena Sánchez', 'elena.s@example.com', '$2a$10$OLFtHR1GqCSvZYtMHU2gv.9SYrBvlc6gKYD4eIZsPlPGenKzs9CNi', 'Ronda Sur 20', '690123789', 'USER', NOW()),
('David Romero', 'david.r@example.com', '$2a$10$OLFtHR1GqCSvZYtMHU2gv.9SYrBvlc6gKYD4eIZsPlPGenKzs9CNi', 'Calle Palma 11', '623456789', 'USER', NOW()),
('Laura Gil', 'laura.g@example.com', '$2a$10$OLFtHR1GqCSvZYtMHU2gv.9SYrBvlc6gKYD4eIZsPlPGenKzs9CNi', 'Calle Jardín 7', '699876543', 'USER', NOW()),
('Sergio Vidal', 'sergio.v@example.com', '$2a$10$OLFtHR1GqCSvZYtMHU2gv.9SYrBvlc6gKYD4eIZsPlPGenKzs9CNi', 'Av. Andalucía 22', '676543210', 'USER', NOW()),
('Isabel Ortega', 'isabel.o@example.com', '$2a$10$OLFtHR1GqCSvZYtMHU2gv.9SYrBvlc6gKYD4eIZsPlPGenKzs9CNi', 'Calle Mayor 15', '689123456', 'USER', NOW()),
('Alberto Mora', 'alberto.m@example.com', '$2a$10$OLFtHR1GqCSvZYtMHU2gv.9SYrBvlc6gKYD4eIZsPlPGenKzs9CNi', 'Ronda Este 9', '654321789', 'USER', NOW()),
('Nuria Castillo', 'nuria.c@example.com', '$2a$10$OLFtHR1GqCSvZYtMHU2gv.9SYrBvlc6gKYD4eIZsPlPGenKzs9CNi', 'Calle Sur 2', '687654321', 'USER', NOW()),
('Manuel Ríos', 'manuel.r@example.com', '$2a$10$OLFtHR1GqCSvZYtMHU2gv.9SYrBvlc6gKYD4eIZsPlPGenKzs9CNi', 'Paseo del Río 6', '633321123', 'USER', NOW());


-- Insertar un producto enlazado con la categoría
INSERT INTO products (id, nombre, familia, referencia, composicion, descripcion, cuidados, precio, stock, imagen, imagen2, imagen3, color, categoria)
VALUES 
(1, 'ZW COLLECTION FAUX FUR JACKET' , 'chaqueta' ,'4360/246/832','100% polyester' ,'Caring for your clothes is caring for the environment.
To keep your jackets and coats clean, you only need to freshen them up and go over them with a cloth or a clothes brush. If you need to dry clean a garment, look for a dry cleaner that uses technologies that are respectful of the environment. ' ,'Long sleeve jacket with a lapel collar. Front pockets. Matching lining. Hidden button-up front.', 89.95, 150, 'https://res.cloudinary.com/deabexp8e/image/upload/v1746088625/ITEK%20Front/ROPA%20MUJER/Chaquetas/kebbb6mwy0thr46u2yni.jpg', 'https://res.cloudinary.com/deabexp8e/image/upload/v1746088630/ITEK%20Front/ROPA%20MUJER/Chaquetas/ad5wjldcyfhc0rrftcna.jpg', 'https://res.cloudinary.com/deabexp8e/image/upload/v1746088633/ITEK%20Front/ROPA%20MUJER/Chaquetas/oqamzck4g7fehwgj5cnk.jpg', 'Taupe grey', "mujer"),
(2, 'PANTALÓN RELAXED FIT ALGODÓN - lino' , 'lino' ,'1437/450/800','100% lino' ,'Los lavados a baja temperatura y los centrifugados delicados son más suaves con las prendas y ayudan a proteger el color, la forma y la estructura del tejido. Además, reducen la cantidad de energía utilizada en los procesos de cuidado.' , 'Pantalón relaxed fit confeccionado en tejido con mezcla de algodón y 14% de lino. Cintura elástica ajustable con cordón. Bolsillos frontales y detalle de bolsillos traseros.', 29.95, 1200, 'https://res.cloudinary.com/deabexp8e/image/upload/v1746101881/ITEK%20Front/ROPA%20HOMBRE/lino/l3tdiuop20xmygs8nmdf.jpg', 'https://res.cloudinary.com/deabexp8e/image/upload/v1746101883/ITEK%20Front/ROPA%20HOMBRE/lino/cm1zehizjy0mbageud79.jpg', 'https://res.cloudinary.com/deabexp8e/image/upload/v1746101884/ITEK%20Front/ROPA%20HOMBRE/lino/hbstvfwuu6ecarwzptyl.jpg', 'Negro', "hombre");


-- tallas de la primera prenda
INSERT INTO product_tallas (product_id, talla)
VALUES
  (1, 'S'),
  (1, 'M'),
  (1, 'L'),
  (2, 'S'),
  (2, 'L'),
  (2, 'XL');

-- Insertar un pedido
INSERT INTO orders (user_id, fecha, estado, total, metodoPago, direccionEnvio)
VALUES (1, NOW(), 'PENDIENTE', 19.99, 'PAYPAL', 'Calle Falsa 123');

-- Insertar detalle del pedido
INSERT INTO orderdetails (pedido_id, producto_id, cantidad, precioUnitario)
VALUES (1, 1, 1, 19.99);

-- Insertar pago
INSERT INTO payments (pedido_id, monto, metodoPago, fechaPago, estado)
VALUES (1, 19.99, 'PAYPAL', NOW(), 'PENDIENTE');

-- Insertar en historial de pedidos
INSERT INTO orderhistories (pedido_id, usuario_id, fechaActualizacion, estadoAnterior, estadoNuevo)
VALUES (1, 1, NOW(), 'PENDIENTE', 'PENDIENTE');

-- Insertar 2 carritos de golpe (para usuario 1 y 2)
INSERT INTO carts (usuario_id) 
VALUES (1), (2);

-- Insertar un producto en el carrito
INSERT INTO cart_product (cart_id, product_id) VALUES
 (1, 1),
 (2, 1),
 (2, 2);

