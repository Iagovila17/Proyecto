package com.tienda.I.tek.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

<<<<<<< HEAD
import com.tienda.I.tek.DTO.CheckoutRequest;
import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.Order;
import com.tienda.I.tek.Entities.OrderHistory;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Enumerated.EstadoPedido;
import com.tienda.I.tek.Enumerated.MetodoPago;
import com.tienda.I.tek.Repository.OrderHistoryRepository;
import com.tienda.I.tek.Repository.OrderRepository;
import com.tienda.I.tek.Repository.UserRepository;
=======
import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.Order;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Enumerated.EstadoPedido;
import com.tienda.I.tek.Enumerated.MetodoPago;
import com.tienda.I.tek.Repository.OrderRepository;
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3

import jakarta.transaction.Transactional;

@Service
public class OrderService implements IOrderService {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
<<<<<<< HEAD
    private IcartService cartService; 
    
     @Autowired
    private OrderHistoryRepository historyRepo; 
   
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private  UserService userService;

    @Autowired
    private UserRepository userRepo;

    public User findById(Long id) {
        return userRepo.findById(id).orElse(null);
    }
=======
    private IUserService userService;

    @Autowired
    private IcartService cartService; 
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3

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


    
<<<<<<< HEAD
@Transactional
public Order checkout(User user, CheckoutRequest request) {
    // Obtener el carrito del usuario
    Cart cart = cartService.getCartByUser(user);
    if (cart == null || cart.getProductos().isEmpty()) {
        throw new RuntimeException("El carrito está vacío");
    }

    // Crear y configurar la nueva orden
    Order order = new Order();
    order.setFecha(request.getFecha() != null ? request.getFecha() : new Date());
    order.setEstado(EstadoPedido.PENDIENTE);
    order.setMetodoPago(request.getMetodoPago() != null ? MetodoPago.valueOf(request.getMetodoPago().toUpperCase()) : MetodoPago.TARJETA);
    order.setDireccionEnvio(request.getDireccionEnvio() != null ? request.getDireccionEnvio() : "Dirección no proporcionada");
    order.setTotal(request.getTotal() != null ? request.getTotal() : 0.0);
    order.setUser(user);  // Relacionar el pedido con el usuario

    // Guardar la orden
    orderRepo.save(order);

    // Guardar la orden en el historial (HistoryCart)
    OrderHistory orderHistory = new OrderHistory();
    orderHistory.setUsuario(user);
    orderHistory.setFecha(order.getFecha());
    orderHistory.setMetodoPago(order.getMetodoPago().toString());
    orderHistory.setDireccionEnvio(order.getDireccionEnvio());
    orderHistory.setTotal(order.getTotal());
    orderHistory.setOrder(order);  // Relacionar el historial con la orden

    historyRepo.save(orderHistory); // Guardar en el historial

    // Limpiar el carrito después de realizar el pedido (vaciar productos pero no eliminar la entidad Cart)
    cartService.clearCart(user.getId());

    return order;  // Devolver el pedido
}




=======
    @Transactional
    public Order checkout(Long userId) {
        // Obtener el usuario por su ID
        User user = userService.idUser(userId);
        if (user == null) throw new RuntimeException("Usuario no encontrado");
    
        // Obtener el carrito del usuario
        Cart cart = cartService.getCartByUser(user);  // Pasa el objeto User, no el ID
        if (cart == null || cart.getProductos().isEmpty()) throw new RuntimeException("El carrito está vacío");
    
        // Crear y configurar la nueva orden
        Order order = new Order();
        order.setUser(user);
        order.setFecha(new Date());
        order.setEstado(EstadoPedido.PENDIENTE);
        order.setMetodoPago(MetodoPago.PAYPAL); 
        order.setDireccionEnvio(user.getDireccion()); 
    
        // Calcular el total de la orden
        double total = cart.getProductos().stream()
                .mapToDouble(p -> p.getPrecio())
                .sum();
    
        // Establecer el total y guardar la orden
        order.setTotal(total);
        orderRepo.save(order);
    
        // Limpiar el carrito después de realizar el pedido
        cartService.clearCart(String.valueOf(user.getId()));  // No es necesario pasar el ID como String si el método ya está adaptado para recibir un User
    
        return order;
    }
    
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
}