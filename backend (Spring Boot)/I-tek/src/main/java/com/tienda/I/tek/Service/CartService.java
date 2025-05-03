package com.tienda.I.tek.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.Product;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Repository.CartRepository;
import com.tienda.I.tek.Repository.ProductRepository;
import com.tienda.I.tek.Repository.UserRepository;

@Service
public class CartService  implements IcartService {

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







@Override
    public Cart getCartByUser(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        return cartRepo.findByUsuario(user)
            .orElseGet(() -> {
                Cart cart = new Cart();
                cart.setUsuario(user);
                cart.setProductos(new ArrayList<>());
                return cartRepo.save(cart);
            });
    }

    @Override
    public void addProductToCart(String nombre, Long productId) {
        Cart cart = getCartByUser(nombre);
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        cart.getProductos().add(product);
        cartRepo.save(cart);
    }

    @Override
    public void removeProductFromCart(String nombre, Long productId) {
        Cart cart = getCartByUser(nombre);
        cart.getProductos().removeIf(p -> p.getId().equals(productId));
        cartRepo.save(cart);
    }

    @Override
    public void clearCart(String nombre) {
        Cart cart = getCartByUser(nombre);
        cart.getProductos().clear();
        cartRepo.save(cart);
    }
}
