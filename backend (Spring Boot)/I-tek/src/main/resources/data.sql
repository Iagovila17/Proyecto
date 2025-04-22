-- Insertar un usuario
INSERT INTO users (nombre, email, password, direccion, telefono, rol, fechaRegistro) VALUES 
('Iago Vila', 'iagovila17@gmail.com', '$2a$10$Y1SGQdD1a7ynMjblfvuP3eUOoezRrUS6GM6k3v2zHwL5Qbi1Z1t5K', 'Rua Boa Vista', '607048861', 'ADMIN', NOW()),
('Juan Pérez', 'juan@example.com', '$2a$10$XJX6OQO7IuM5y2ZybF69reTbdGvWjX0bbz.C74RlF25ZaVtf9msqK', 'Calle Falsa 123', '123456789', 'USER', NOW());

-- Insertar una categoría
INSERT INTO categories (id, nombre, descripcion)
VALUES (1, 'Camisetas', 'Camisetas de diferentes estilos y tallas');

-- Insertar un producto enlazado con la categoría
INSERT INTO products (id, nombre, descripcion, precio, stock, categoria_id, imagen, tamaño, color)
VALUES (1, 'Camiseta Negra', 'Camiseta básica negra 100% algodón', 19.99, 50, 1, 'imagen_url.jpg', 'M', 'Negro');

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

-- Insertar un carrito asociado al usuario
INSERT INTO carts (usuario_id) 
VALUES (1);  -- Suponiendo que el id del usuario es 1

-- Insertar un producto en el carrito
INSERT INTO cart_product (cart_id, product_id) 
VALUES (1, 1);  -- Suponiendo que el id del carrito es 1 y el id del producto es 1
