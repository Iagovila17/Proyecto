package com.tienda.I.tek.Service;

import java.util.List;

import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.User;

public interface IcartService {

    //REST
    public List<Cart> listcarrito();
    public void savecarrito(Cart cart);
    public void deleteCarrito(Long id);

    Cart getOrCreateCartByUser(User user);
    Cart getCartByUser(User user);  
    void vaciarCarrito(User user);  
}
