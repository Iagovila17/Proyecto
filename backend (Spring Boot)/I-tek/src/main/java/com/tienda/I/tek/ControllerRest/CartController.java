package com.tienda.I.tek.ControllerRest;


import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Repository.CartRepository;
import com.tienda.I.tek.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/cesta")
@CrossOrigin(origins = "http://localhost:5174") 
public class CartController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @GetMapping("/cesta")
    public ResponseEntity<?> obtenerCesta() {
        // Obtener el usuario autenticado
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        
        // Buscar el usuario en la base de datos
        User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Buscar la cesta asociada al usuario
        Cart cart = cartRepository.findByUsuarioId(user.getId())
                    .orElseThrow(() -> new RuntimeException("Cesta no encontrada"));

        // Ver si el carrito tiene productos
        boolean tieneProductos = !cart.getProductos().isEmpty();

        Map<String, Object> response = new HashMap<>();
        response.put("tieneProductos", tieneProductos);
        response.put("productos", cart.getProductos());  

        return ResponseEntity.ok(response);
    }
}
