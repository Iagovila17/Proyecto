package com.tienda.I.tek.ControllerRest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.tienda.I.tek.Entities.Product;
import com.tienda.I.tek.Service.FavoritoService;

@RestController
@RequestMapping("/favoritos")
public class FavoritoController {

    @Autowired
    private FavoritoService favoritoService;

    
    @GetMapping
    public List<Product> obtenerFavoritos(Authentication authentication) {
        String email = authentication.getName();
        return favoritoService.obtenerFavoritosPorEmail(email);
    }
    @PostMapping("/{productoId}")
    public ResponseEntity<?> agregarFavorito(@PathVariable Long productoId, Authentication authentication) {
        String email = authentication.getName();
        favoritoService.agregarFavorito(email, productoId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{productoId}")
    public ResponseEntity<?> eliminarFavorito(@PathVariable Long productoId, Authentication authentication) {
        String email = authentication.getName();
        favoritoService.eliminarFavorito(email, productoId);
        return ResponseEntity.ok().build();
    }
}
