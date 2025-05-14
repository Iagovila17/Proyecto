package com.tienda.I.tek.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tienda.I.tek.DTO.CheckoutRequest;
import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.Cartitem;
import com.tienda.I.tek.Entities.Order;
import com.tienda.I.tek.Entities.OrderDetail;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Enumerated.EstadoPedido;
import com.tienda.I.tek.Enumerated.MetodoPago;
import com.tienda.I.tek.Repository.OrderRepository;
import com.tienda.I.tek.Repository.UserRepository;
import com.tienda.I.tek.Repository.orderDetailRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderService implements IOrderService {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private IcartService cartService; 

    @Autowired
    private orderDetailRepository orderDetailRepo;  // Añadir la anotación @Autowired

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepo;

    public User findById(Long id) {
        return userRepo.findById(id).orElse(null);
    }

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

    // Elimina este constructor si ya no es necesario:
    // public OrderService(OrderRepository orderRepository) {
    //     this.orderRepository = orderRepository;
    // }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepo.findByUserId(userId);  // Usamos el nombre correcto del campo
    }

    @Transactional
    public Order checkout(User user, CheckoutRequest request) {
        // Obtener el carrito del usuario
        Cart cart = cartService.getCartByUser(user);
        if (cart == null || cart.getItems().isEmpty()) {
            throw new RuntimeException("El carrito está vacío");
        }

        // Crear y configurar la nueva orden
        Order order = new Order();
        order.setFecha(request.getFecha() != null ? request.getFecha() : new Date());
        order.setEstado(EstadoPedido.PENDIENTE);
        order.setMetodoPago(request.getMetodoPago() != null ? MetodoPago.valueOf(request.getMetodoPago().toUpperCase()) : MetodoPago.TARJETA);
        order.setDireccionEnvio(request.getDireccionEnvio() != null ? request.getDireccionEnvio() : "Dirección no proporcionada");
        order.setTotal(request.getTotal() != null ? request.getTotal() : 0.0);
        order.setUser(user);

        // Guardar la orden
        orderRepo.save(order);

        // Crear los detalles de la orden
        List<OrderDetail> orderDetails = new ArrayList<>();
        for (Cartitem item : cart.getItems()) {
            OrderDetail detail = new OrderDetail();
            detail.setOrder(order);
            detail.setProduct(item.getProduct());
            detail.setQuantity(item.getCantidad());
            detail.setTalla(item.getTalla());
            detail.setUnitPrice(item.getProduct().getPrecio());
            detail.setTotalPrice(item.getCantidad() * item.getProduct().getPrecio());

            orderDetails.add(detail);
        }

        // Guardar los detalles
        orderDetailRepo.saveAll(orderDetails);

        // Vaciar el carrito
        cartService.clearCart(user.getId());

        return order;
    }

}
