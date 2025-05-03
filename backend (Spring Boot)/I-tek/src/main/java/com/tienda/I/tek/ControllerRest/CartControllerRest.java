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
import java.security.Principal;


@RestController
@RequestMapping("/cesta")
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



    @GetMapping
    public ResponseEntity<Cart> getCart(Principal principal) {
        Cart cart = cartServi.getCartByUser(principal.getName());
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/add/{productId}")
    public ResponseEntity<String> addProduct(@PathVariable Long productId, Principal principal) {
        cartServi.addProductToCart(principal.getName(), productId);
        return ResponseEntity.ok("Producto añadido a la cesta");
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<String> removeProduct(@PathVariable Long productId, Principal principal) {
        cartServi.removeProductFromCart(principal.getName(), productId);
        return ResponseEntity.ok("Producto eliminado de la cesta");
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(Principal principal) {
        cartServi.clearCart(principal.getName());
        return ResponseEntity.ok("Cesta vaciada");
    }

}
