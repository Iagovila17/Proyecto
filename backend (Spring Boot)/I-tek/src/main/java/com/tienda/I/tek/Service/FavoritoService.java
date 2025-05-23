package com.tienda.I.tek.Service;

import org.springframework.stereotype.Service;

import com.tienda.I.tek.Entities.Favorito;
import com.tienda.I.tek.Entities.Product;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Repository.FavoritoRepository;
import com.tienda.I.tek.Repository.ProductRepository;
import com.tienda.I.tek.Repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

@Service

public class FavoritoService {

    @Autowired
    private FavoritoRepository favoritoRepository;

    @Autowired
    private UserRepository usuarioRepository;

    @Autowired
    private ProductRepository productoRepository;

    // Obtener lista de favoritos de un usuario por su email
    public List<Product> obtenerFavoritosPorEmail(String email) {
        User usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        List<Favorito> favoritos = favoritoRepository.findByUsuarioId(usuario.getId());

        return favoritos.stream()
            .map(Favorito::getProducto)
            .collect(Collectors.toList());
    }

    // Añadir producto a favoritos
    public void agregarFavorito(String email, Long productoId) {
        User usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Product producto = productoRepository.findById(productoId)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Comprobar si ya está añadido
        boolean existe = favoritoRepository.findByUsuarioIdAndProductoId(usuario.getId(), productoId).isPresent();
        if (!existe) {
            Favorito favorito = new Favorito();
            favorito.setUsuario(usuario);
            favorito.setProducto(producto);
            favoritoRepository.save(favorito);
        }
    }

    // Eliminar producto de favoritos
    public void eliminarFavorito(String email, Long productoId) {
        User usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        favoritoRepository.findByUsuarioIdAndProductoId(usuario.getId(), productoId)
            .ifPresent(favoritoRepository::delete);
    }
}
