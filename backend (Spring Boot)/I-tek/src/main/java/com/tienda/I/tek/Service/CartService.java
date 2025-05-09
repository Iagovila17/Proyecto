package com.tienda.I.tek.Service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.Product;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Repository.CartRepository;
import com.tienda.I.tek.Repository.ProductRepository;
import com.tienda.I.tek.Repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class CartService implements IcartService {

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Cart> listcarrito() {
        return cartRepo.findAll();
    }

    @Override
    public void savecarrito(Cart cart) {
        cartRepo.save(cart);
    }

    @Override
    public void deleteCarrito(Long id) {
        cartRepo.deleteById(id);
    }

    // Método para obtener o crear un carrito para un usuario
    public Cart getOrCreateCart(User user) {
        Cart cart = cartRepo.findByUsuario(user).orElse(null);
        if (cart == null) {
            // Si no existe el carrito, creamos uno nuevo
            cart = new Cart();
            cart.setUsuario(user);
            cartRepo.save(cart);  // Guardamos el carrito nuevo en la base de datos
        }
        return cart;
    }

    @Transactional
    public void addProductToCart(String email, Long productId) {
        // Obtener el usuario por su email
        User usuario = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        // Obtener el producto
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Buscar el carrito del usuario
        Cart cart = getOrCreateCart(usuario);  // Si no existe, crea uno nuevo

        // Añadir el producto al carrito (suponiendo que tienes una lista de productos en el carrito)
        cart.getProductos().add(product);

        // Guardar el carrito con el producto añadido
        cartRepo.save(cart);
    }

    @Override
    public void removeProductFromCart(String nombre, Long productId) {
        // Obtener el carrito por nombre de usuario
        User usuario = userRepository.findByEmail(nombre)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        Cart cart = getCartByUser(usuario);
        
        // Eliminar el producto del carrito
        cart.getProductos().removeIf(p -> p.getId().equals(productId));
        cartRepo.save(cart);
    }

    @Override
    public void clearCart(String nombre) {
        // Obtener el carrito por nombre de usuario
        User usuario = userRepository.findByEmail(nombre)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        Cart cart = getCartByUser(usuario);
        
        // Limpiar todos los productos del carrito
        cart.getProductos().clear();
        cartRepo.save(cart);
    }

    public Cart getCartByUser(User usuario) {
        // Buscar el carrito del usuario
        Optional<Cart> cartOpt = cartRepo.findByUsuario(usuario);
        if (cartOpt.isPresent()) {
            return cartOpt.get();
        } else {
            throw new EntityNotFoundException("No se encontró el carrito para el usuario.");
        }
    }
}
