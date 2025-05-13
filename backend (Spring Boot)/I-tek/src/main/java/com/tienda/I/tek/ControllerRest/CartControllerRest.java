package com.tienda.I.tek.ControllerRest;

<<<<<<< HEAD
import java.util.HashMap;
=======
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

<<<<<<< HEAD
import com.tienda.I.tek.DTO.CheckoutRequest;
import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.Order;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Repository.CartRepository;
=======
import com.tienda.I.tek.DTO.OrderDTO;
import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.Order;
import com.tienda.I.tek.Entities.User;
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
import com.tienda.I.tek.Repository.UserRepository;
import com.tienda.I.tek.Secutiry.JwtTokenProvider;
import com.tienda.I.tek.Service.CartService;
import com.tienda.I.tek.Service.OrderService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
=======
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3

import java.security.Principal;


@RestController
@RequestMapping("/cesta")
public class CartControllerRest {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CartService cartServi;

<<<<<<< HEAD
    private CartRepository CartRepo;

=======
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
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

<<<<<<< HEAD
    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody CheckoutRequest request,@RequestHeader("Authorization") String token) {
        try {
            // Obtener email desde el token
            String email = jwtTokenProvider.getEmailFromToken(token.replace("Bearer ", ""));
            System.out.println("Email extraído del token: " + email); 
            User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            // Llamar al servicio de checkout
            Order order = orderServi.checkout(user, request);

            // Devolver la orden como respuesta
            return ResponseEntity.ok(order);

        } catch (Exception e) {
    e.printStackTrace(); // 👈 imprime el stacktrace completo en consola

    Map<String, String> errorResponse = new HashMap<>();
    errorResponse.put("error", "Error al realizar el checkout: " + e.getMessage());
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
}
    }


=======
     @PostMapping("/checkout/{userId}")
        public ResponseEntity<?> checkout(@PathVariable Long userId) {
            try {
                Order order = orderServi.checkout(userId);
                return ResponseEntity.ok(new OrderDTO(order));
            } catch (RuntimeException e) {
                return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
            }
    }



>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
    @GetMapping
    public ResponseEntity<Cart> getCart(Principal principal) {
        // Obtener el usuario a partir del nombre de usuario del Principal
        User user = userRepo.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    
        // Obtener el carrito del usuario
        Cart cart = cartServi.getCartByUser(user); // Usar el objeto User
    
        // Retornar el carrito con una respuesta OK
        return ResponseEntity.ok(cart);
    }





@PostMapping("/add/{productId}")
public ResponseEntity<String> addProduct(@PathVariable Long productId, Principal principal) {
    try {
        cartServi.addProductToCart(principal.getName(), productId);
        return ResponseEntity.ok("Producto añadido a la cesta");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al añadir el producto");
    }
}







    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<String> removeProduct(@PathVariable Long productId, Principal principal) {
        cartServi.removeProductFromCart(principal.getName(), productId);
        return ResponseEntity.ok("Producto eliminado de la cesta");
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(Principal principal) {
<<<<<<< HEAD
         try {
             // Retrieve usuarioId from the Principal object
             User user = userRepo.findByEmail(principal.getName())
                     .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
             Cart cart = CartRepo.findByUsuarioId(user.getId())
                     .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
             if (cart != null) {
                 cart.getProductos().clear(); // Vacía los productos
                 CartRepo.save(cart); // Guarda el carrito vacío (no lo borra)
             }
             return ResponseEntity.ok("Carrito vaciado correctamente");
         } catch (Exception e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al vaciar el carrito: " + e.getMessage());
         }
=======
        cartServi.clearCart(principal.getName());
        return ResponseEntity.ok("Cesta vaciada");
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
    }

}
