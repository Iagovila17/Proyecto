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

    public Cart getOrCreateCart(User user) {
        Cart cart = cartRepo.findByUsuario(user).orElse(null);
        if (cart == null) {
            cart = new Cart();
            cart.setUsuario(user);
            cartRepo.save(cart);  
        }
        return cart;
    }


    
@Transactional
public void addProductToCart(String email, Long productId, Talla talla, int cantidad) {
    User usuario = userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

    Product product = productRepository.findById(productId)
        .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

    Cart cart = getOrCreateCart(usuario);

    Optional<Cartitem> existingItem = cart.getItems().stream()
        .filter(item -> item.getProduct().getId().equals(productId) && item.getTalla().equals(talla))
        .findFirst();

    if (existingItem.isPresent()) {
        Cartitem item = existingItem.get();
        item.setCantidad(item.getCantidad() + cantidad);
    } else {
        Cartitem newItem = new Cartitem();
        newItem.setProduct(product);
        newItem.setTalla(talla);
        newItem.setCantidad(cantidad);
        newItem.setCart(cart);
        cart.getItems().add(newItem);
    }
    cartRepo.save(cart);
}


public void removeProductFromCart(String username, Long productId) {
    User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    Cart cart = cartRepo.findByUsuarioId(user.getId())
        .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
    
    cart.getItems().removeIf(item -> item.getProduct().getId().equals(productId));
    cartRepo.save(cart);
}


@Transactional
public void clearCart(Long userId) {
    Cart cart = cartRepo.findByUsuario_Id(userId)
            .orElseThrow(() -> new RuntimeException("Carrito no encontrado para el usuario ID: " + userId));
    cart.getItems().clear(); 
    cartRepo.save(cart);
}

    public Cart getCartByUser(User usuario) {
        Optional<Cart> cartOpt = cartRepo.findByUsuario(usuario);
        if (cartOpt.isPresent()) {
            return cartOpt.get();
        } else {
            throw new EntityNotFoundException("No se encontró el carrito para el usuario.");
        }
    }

   

}