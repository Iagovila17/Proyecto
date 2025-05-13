package com.tienda.I.tek.ControllerRest;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.I.tek.DTO.OrderDTO;
import com.tienda.I.tek.Entities.Order;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Service.OrderService;
import com.tienda.I.tek.Service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
<<<<<<< HEAD
import com.tienda.I.tek.Repository.OrderRepository;
=======

>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3


@RestController
@RequestMapping("/order")
public class OrderControllerRest{
<<<<<<< HEAD
=======

>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
    
    @Autowired
    private OrderService orderService;
   
    @Autowired
    private UserService userService;
<<<<<<< HEAD
    @Autowired
    private OrderRepository orderRepository;
=======
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3

    @GetMapping("/user/{userId}")  
    public ResponseEntity<?> getOrdersByUser(@PathVariable Long userId) {
        User user = userService.idUser(userId);  
    
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
    
        List<Order> orders = orderService.getOrdersByUser(user);

        if (orders.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El usuario no tiene pedidos");
        }

        List<OrderDTO> orderDTOs = orders.stream()
            .map(OrderDTO::new)
            .collect(Collectors.toList());

            return ResponseEntity.ok(orderDTOs);
        }
    
    @PostMapping("/save")  
    public void saveOrder(Order order) {
        orderService.saveOrder(order);
    }
    

    @GetMapping("/{id}") 
        public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        Optional<Order> orderOptional = orderService.getOrderById(id);

        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            OrderDTO dto = new OrderDTO(order); 
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pedido no encontrado");
        }
    }
<<<<<<< HEAD
=======


   



>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
}