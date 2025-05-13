package com.tienda.I.tek.Enumerated;

public enum EstadoPedido {

    PENDIENTE,      // Pedido registrado pero no procesado
    EN_PROCESO,     // Pedido en preparación o en curso
    ENVIADO,        // Pedido enviado al cliente
    ENTREGADO,      // Pedido recibido por el cliente
    CANCELADO,      // Pedido cancelado antes de la entrega
    DEVUELTO        // Pedido devuelto por el cliente
}
