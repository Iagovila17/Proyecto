package com.tienda.I.tek.Service;

import java.util.List;

import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.User;

public interface IcartService {

    //REST
    public List<Cart> listcarrito();
    public void savecarrito(Cart cart);
    public void deleteCarrito(Long id);

     

    // CartService methods
    Cart getCartByUser(User usuario);
    void addProductToCart(String nombre, Long productId);
    void removeProductFromCart(String nombre, Long productId);
    void clearCart(Long userId);
    
}
