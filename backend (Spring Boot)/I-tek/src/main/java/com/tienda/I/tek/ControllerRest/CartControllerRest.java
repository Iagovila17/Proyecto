package com.tienda.I.tek.ControllerRest;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.I.tek.DTO.OrderDTO;
import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.Order;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Repository.UserRepository;
import com.tienda.I.tek.Service.CartService;
import com.tienda.I.tek.Service.OrderService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/carrito")
public class CartControllerRest {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CartService cartServi;

    @Autowired
    private OrderService orderServi;

    @GetMapping("/list")
    public List<Cart> listcarrito() {
        return cartServi.listcarrito();
    }

    @PostMapping("/save")
    public void savecarrito(Cart cart) {
        cartServi.savecarrito(cart);;
    }
    
    @DeleteMapping("/delete")
    public void deleteCarrito(Long id) {
        cartServi.deleteCarrito(id);;
    }

     @PostMapping("/checkout/{userId}")
        public ResponseEntity<?> checkout(@PathVariable Long userId) {
            try {
                Order order = orderServi.checkout(userId);
                return ResponseEntity.ok(new OrderDTO(order));
            } catch (RuntimeException e) {
                return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
            }
    }

    @GetMapping("/getOrCreate/{userId}")
    public ResponseEntity<Cart> getOrCreateCart(@PathVariable Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Cart cart = cartServi.getOrCreateCartByUser(user);
        return ResponseEntity.ok(cart); 
    }

}
