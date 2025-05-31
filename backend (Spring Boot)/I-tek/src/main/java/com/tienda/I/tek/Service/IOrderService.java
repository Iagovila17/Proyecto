package com.tienda.I.tek.Service;

import java.util.List;
import java.util.Optional;

import com.tienda.I.tek.DTO.OrderDTO;
import com.tienda.I.tek.Entities.Order;

import com.tienda.I.tek.Entities.User;

public interface IOrderService {

    public List<Order> listOrdersForUser(User user);
    public void saveOrder(Order order); 
    public Optional<Order> getOrderById(Long id);

    List<OrderDTO> getAllOrders();
    void actualizarEstado(Long orderId, String nuevoEstado);
    
   
}
