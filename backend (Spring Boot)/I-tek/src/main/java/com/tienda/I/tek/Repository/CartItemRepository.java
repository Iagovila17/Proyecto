package com.tienda.I.tek.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.Cartitem;
import com.tienda.I.tek.Enumerated.Talla;


public interface CartItemRepository extends JpaRepository<Cartitem, Long> {

List<Cartitem> findByCartAndProductId(Cart cart, Long productId);
}
