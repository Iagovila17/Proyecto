package com.tienda.I.tek.Entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;
    @Column(nullable = false)
    private String descripcion;
    @Column(nullable = false)
    private double precio;
    @Column(nullable = true)
    private int stock;
    @Column(nullable = true)
    private String imagen;
    @Column(nullable = true)
    private String tamaño;
    @Column(nullable = false)
    private String color;

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Category categoria;
}
