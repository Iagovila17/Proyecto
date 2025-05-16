package com.tienda.I.tek.Service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.Cartitem;
import com.tienda.I.tek.Entities.Product;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Enumerated.Talla;
import com.tienda.I.tek.Repository.CartRepository;
import com.tienda.I.tek.Repository.ProductRepository;
import com.tienda.I.tek.Repository.UserRepository;
import com.tienda.I.tek.Repository.CartItemRepository;

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

    @Autowired
    private CartItemRepository cartItemRepository;

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
public void addProductToCart(String email, Long productId, Talla talla, int cantidad) {
    // Obtener el usuario por su email
    User usuario = userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

    // Obtener el producto
    Product product = productRepository.findById(productId)
        .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

    // Obtener o crear carrito
    Cart cart = getOrCreateCart(usuario);

    // Buscar si ya existe un CartItem con ese producto y talla
    Optional<Cartitem> existingItem = cart.getItems().stream()
        .filter(item -> item.getProduct().getId().equals(productId) && item.getTalla().equals(talla))
        .findFirst();

    if (existingItem.isPresent()) {
        // Si ya existe, aumentar la cantidad
        Cartitem item = existingItem.get();
        item.setCantidad(item.getCantidad() + cantidad);
    } else {
        // Si no existe, crear uno nuevo
        Cartitem newItem = new Cartitem();
        newItem.setProduct(product);
        newItem.setTalla(talla);
        newItem.setCantidad(cantidad);
        newItem.setCart(cart);
        cart.getItems().add(newItem);
    }

    // Guardar el carrito
    cartRepo.save(cart);
}


public void removeProductFromCart(String username, Long productId) {
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    Cart cart = cartRepo.findByUsuarioId(user.getId())
        .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
    
    // Remover el item del carrito
    cart.getItems().removeIf(item -> item.getProduct().getId().equals(productId));

    // Guardar cambios en BD
    cartRepo.save(cart);
}


@Transactional
public void clearCart(Long userId) {
    Cart cart = cartRepo.findByUsuario_Id(userId)
            .orElseThrow(() -> new RuntimeException("Carrito no encontrado para el usuario ID: " + userId));

    cart.getItems().clear(); // "items" es la lista de CartItem
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