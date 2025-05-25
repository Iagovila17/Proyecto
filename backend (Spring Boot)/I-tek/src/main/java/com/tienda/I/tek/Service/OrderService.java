package com.tienda.I.tek.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tienda.I.tek.DTO.CheckoutRequest;
import com.tienda.I.tek.DTO.OrderDTO;
import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.Cartitem;
import com.tienda.I.tek.Entities.Order;
import com.tienda.I.tek.Entities.OrderDetail;
import com.tienda.I.tek.Entities.Product;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Enumerated.EstadoPedido;
import com.tienda.I.tek.Enumerated.MetodoPago;
import com.tienda.I.tek.Repository.OrderRepository;
import com.tienda.I.tek.Repository.ProductRepository;
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

    @Autowired
    private ProductRepository productRepository;



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

  

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepo.findByUserId(userId);  
    }

@Transactional
public Order checkout(User user, CheckoutRequest request) {
    Cart cart = cartService.getCartByUser(user);
    if (cart == null || cart.getItems().isEmpty()) {
        throw new RuntimeException("El carrito está vacío");
    }

    Order order = new Order();
    order.setFecha(request.getFecha() != null ? request.getFecha() : new Date());
    order.setEstado(EstadoPedido.PENDIENTE);
    order.setMetodoPago(request.getMetodoPago() != null ? MetodoPago.valueOf(request.getMetodoPago().toUpperCase()) : MetodoPago.TARJETA);
    order.setDireccionEnvio(request.getDireccionEnvio() != null ? request.getDireccionEnvio() : "Dirección no proporcionada");
    order.setTotal(request.getTotal() != null ? request.getTotal() : 0.0);
    order.setUser(user);
    orderRepo.save(order);

    List<OrderDetail> orderDetails = new ArrayList<>();
    for (Cartitem item : cart.getItems()) {
        Product producto = item.getProduct();

        if (producto.getStock() < item.getCantidad()) {
            throw new RuntimeException("No hay suficiente stock para el producto: " + producto.getNombre());
        }

        producto.setStock(producto.getStock() - item.getCantidad());
        productRepository.save(producto);

        OrderDetail detail = new OrderDetail();
        detail.setOrder(order);
        detail.setProduct(producto);
        detail.setQuantity(item.getCantidad());
        detail.setTalla(item.getTalla());
        detail.setUnitPrice(producto.getPrecio());
        detail.setTotalPrice(item.getCantidad() * producto.getPrecio());

        orderDetails.add(detail);
    }

    orderDetailRepo.saveAll(orderDetails);
    cartService.clearCart(user.getId());

    return order;
}



//ADMIN PEDIDOS 
     @Override   
    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderRepo.findAll();

        return orders.stream().map(order -> {
            OrderDTO dto = new OrderDTO();
            dto.setId(order.getId());
            dto.setFecha(order.getFecha());
            dto.setEstado(order.getEstado());
            dto.setTotal(order.getTotal());
            dto.setDireccionEnvio(order.getDireccionEnvio());

            if (order.getUser() != null) {
                dto.setUsername(order.getUser().getUsername());
                dto.setEmail(order.getUser().getEmail());
            }

            return dto;
        }).collect(Collectors.toList());
    }




    @Override
    public void actualizarEstado(Long orderId, String nuevoEstado) {
    Order order = orderRepo.findById(orderId)
        .orElseThrow(() -> new IllegalArgumentException("Pedido no encontrado"));

    try {
        EstadoPedido estado = EstadoPedido.valueOf(nuevoEstado.toUpperCase());
        order.setEstado(estado);
        orderRepo.save(order);
    } catch (IllegalArgumentException e) {
        throw new IllegalArgumentException("Estado no válido: " + nuevoEstado);
    }
}
}
