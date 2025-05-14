package com.tienda.I.tek.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tienda.I.tek.Entities.OrderDetail;

@Repository
public interface orderDetailRepository extends JpaRepository<OrderDetail, Long> {
    List<OrderDetail> findByOrderId(Long orderId);

    @Query("SELECT od FROM OrderDetail od JOIN FETCH od.product WHERE od.order.id = :orderId")
    List<OrderDetail> findByOrderIdWithProduct(@Param("orderId") Long orderId);
}