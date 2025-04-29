package com.tienda.I.tek.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.User;

import jakarta.transaction.Transactional;


public interface CartRepository  extends JpaRepository<Cart, Long>{
    Optional<Cart> findByUsuarioId(Long usuarioId);
    Cart findByUsuario(User usuario);


    }
