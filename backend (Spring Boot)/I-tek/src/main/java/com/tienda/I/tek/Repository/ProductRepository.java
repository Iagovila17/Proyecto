package com.tienda.I.tek.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tienda.I.tek.Entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
