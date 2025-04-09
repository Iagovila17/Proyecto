package com.tienda.I.tek.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tienda.I.tek.Entities.Order;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Repository.OrderRepository;

@Service
public class OrderService implements IOrderService{

    @Autowired
    public OrderRepository orderRepo;
   
    @Override
    public List<Order> listOrdersForUser(User user) {
        return orderRepo.findByUser(user); 
    }

    // Método para obtener los pedidos de un usuario
    public List<Order> getOrdersByUser(User user) {
        return orderRepo.findByUser(user);
    }

    @Override
    public void saveOrder(Order order) {
        orderRepo.save(order);
    }

    @Override
    public Optional<Order> getOrderById(Long id) {
    return orderRepo.findById(id);
    }
}
