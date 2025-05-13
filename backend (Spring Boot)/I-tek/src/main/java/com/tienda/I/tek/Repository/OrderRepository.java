package com.tienda.I.tek.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tienda.I.tek.Entities.Order;
import com.tienda.I.tek.Entities.User;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
