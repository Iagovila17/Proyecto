package com.tienda.I.tek.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.User;

public interface CartRepository  extends JpaRepository<Cart, Long>{

    Cart findByUsuario(User usuario);
}
