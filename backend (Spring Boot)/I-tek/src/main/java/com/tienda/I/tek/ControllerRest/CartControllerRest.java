package com.tienda.I.tek.ControllerRest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.I.tek.DTO.CartItemDTO;
import com.tienda.I.tek.DTO.CheckoutRequest;
import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.Order;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Enumerated.Talla;
import com.tienda.I.tek.Repository.CartRepository;
import com.tienda.I.tek.Repository.UserRepository;
import com.tienda.I.tek.Secutiry.JwtTokenProvider;
import com.tienda.I.tek.Service.CartService;
import com.tienda.I.tek.Service.OrderService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.security.Principal;


@RestController
@RequestMapping("/cesta")
public class CartControllerRest {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CartService cartServi;

    private CartRepository CartRepo;

    @Autowired
    private OrderService orderServi;

     @Autowired
    private JwtTokenProvider jwtTokenProvider;

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

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody CheckoutRequest request,@RequestHeader("Authorization") String token) {
        try {
            String email = jwtTokenProvider.getEmailFromToken(token.replace("Bearer ", ""));
            System.out.println("Email extraído del token: " + email); 
            User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            Order order = orderServi.checkout(user, request);

            return ResponseEntity.ok(order);

        } catch (Exception e) {
        e.printStackTrace(); 

        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Error al realizar el checkout: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }


    @GetMapping
    public ResponseEntity<Cart> getCart(Principal principal) {
        User user = userRepo.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    
        Cart cart = cartServi.getCartByUser(user); 
        return ResponseEntity.ok(cart);
    }





@PostMapping("/add/{productId}")
public ResponseEntity<String> addProduct(@PathVariable Long productId, 
                                         @RequestBody CartItemDTO cartItemDTO, 
                                         Principal principal) {
    try {
        String username = principal.getName();
        Talla tallaEnum = Talla.valueOf(cartItemDTO.getTalla().toUpperCase());

        int cantidad = cartItemDTO.getCantidad();

        cartServi.addProductToCart(username, productId, tallaEnum, cantidad);

        return ResponseEntity.ok("Producto añadido a la cesta");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body("Error al añadir el producto: " + e.getMessage());
    }
}






@DeleteMapping("/delete/{productId}")
public ResponseEntity<String> removeProduct(@PathVariable Long productId, Principal principal) {
    try {
        String username = principal.getName();
        cartServi.removeProductFromCart(username, productId);
        return ResponseEntity.ok("Producto eliminado de la cesta");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body("Error al eliminar el producto: " + e.getMessage());
    }
}



    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(Principal principal) {
         try {
             User user = userRepo.findByEmail(principal.getName())
                     .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
             Cart cart = CartRepo.findByUsuarioId(user.getId())
                     .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
             if (cart != null) {
                 cart.getItems().clear(); 
                 CartRepo.save(cart); 
             }
             return ResponseEntity.ok("Carrito vaciado correctamente");
         } catch (Exception e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al vaciar el carrito: " + e.getMessage());
         }
    }

}
