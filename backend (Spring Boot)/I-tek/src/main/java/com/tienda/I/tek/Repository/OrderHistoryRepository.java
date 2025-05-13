package com.tienda.I.tek.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tienda.I.tek.Entities.OrderHistory;

public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Long> {
    
}