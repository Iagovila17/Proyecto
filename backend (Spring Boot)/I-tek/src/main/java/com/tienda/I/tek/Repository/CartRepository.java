package com.tienda.I.tek.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.User;

public interface CartRepository  extends JpaRepository<Cart, Long>{
    Optional<Cart> findByUsuarioId(Long usuarioId);
    Cart findByUsuario(User usuario);
}
