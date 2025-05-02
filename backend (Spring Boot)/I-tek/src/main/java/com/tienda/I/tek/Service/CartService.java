package com.tienda.I.tek.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Repository.CartRepository;
import com.tienda.I.tek.Repository.UserRepository;

@Service
public class CartService  implements IcartService {

    @Autowired
    private CartRepository cartRepo;
    
    

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
    public Cart getOrCreateCartByUser(User user) {
    Cart cart = cartRepo.findByUsuario(user);
    
    if (cart == null) {
        cart = new Cart();
        cart.setUsuario(user);
        cartRepo.save(cart);  
    }
    return cart;
}

    @Override
    public void vaciarCarrito(User user) {
        Cart cart = cartRepo.findByUsuario(user);
        if (cart != null) {
            cart.getProductos().clear();
            cartRepo.save(cart);
        }
    }
    
    @Override
    public Cart getCartByUser(User user) {
   
    Cart cart = cartRepo.findByUsuario(user);
    
    if (cart == null) {
       
        throw new RuntimeException("Carrito no encontrado para el usuario: " + user.getId());
    }
    return cart;
}
}
