package com.tienda.I.tek.ControllerRest;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.I.tek.DTO.OrderDTO;
import com.tienda.I.tek.DTO.OrderDetailDTO;
import com.tienda.I.tek.Entities.Order;
import com.tienda.I.tek.Entities.OrderDetail;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Repository.OrderRepository;
import com.tienda.I.tek.Repository.UserRepository;
import com.tienda.I.tek.Repository.orderDetailRepository;

@RestController
@RequestMapping("/api/history")
public class OrderHistoryController {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final orderDetailRepository orderDetailRepository;

    public OrderHistoryController(UserRepository userRepository, OrderRepository orderRepository, orderDetailRepository orderDetailRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getOrderHistory() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userOptional.get();
        List<Order> orders = orderRepository.findByUserId(user.getId());

        List<OrderDTO> orderDTOs = orders.stream().map(order -> {
            List<OrderDetail> details = orderDetailRepository.findByOrderIdWithProduct(order.getId());

            List<OrderDetailDTO> detailDTOs = details.stream()
                    .map(OrderDetailDTO::new)
                    .collect(Collectors.toList());

            return new OrderDTO(
                    order.getId(),
                    order.getFecha(),
                    order.getTotal(),
                    order.getMetodoPago(),
                    order.getDireccionEnvio(),
                    order.getEstado(),
                    detailDTOs
            );
        }).collect(Collectors.toList());

        return ResponseEntity.ok(orderDTOs);
    }
}