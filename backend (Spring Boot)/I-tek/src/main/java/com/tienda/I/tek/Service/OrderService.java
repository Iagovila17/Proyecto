package com.tienda.I.tek.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.Order;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Enumerated.EstadoPedido;
import com.tienda.I.tek.Enumerated.MetodoPago;
import com.tienda.I.tek.Repository.OrderRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderService implements IOrderService {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private IUserService userService;

    @Autowired
    private IcartService cartService; 

    @Override
    public List<Order> listOrdersForUser(User user) {
        return orderRepo.findByUser(user); 
    }

   
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


    
    @Transactional
    public Order checkout(Long userId) {
        User user = userService.idUser(userId);
        if (user == null) throw new RuntimeException("Usuario no encontrado");

        Cart cart = cartService.getCartByUser(String.valueOf(user.getId())); // Convert Long to String
        if (cart == null || cart.getProductos().isEmpty()) throw new RuntimeException("El carrito está vacío");

        Order order = new Order();
        order.setUser(user);
        order.setFecha(new Date());
        order.setEstado(EstadoPedido.PENDIENTE);
        order.setMetodoPago(MetodoPago.PAYPAL); 
        order.setDireccionEnvio(user.getDireccion()); 

        double total = cart.getProductos().stream()
                .mapToDouble(p -> p.getPrecio())
                .sum();

        order.setTotal(total);
        orderRepo.save(order);

        cartService.clearCart(String.valueOf(user.getId()));
        return order;
    }
}