package com.tienda.I.tek.Entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.Table;

@Entity
@Table(name = "carts") // carrito compra
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "usuario_id")
    private User usuario;

<<<<<<< HEAD
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
=======
    @ManyToMany(fetch = FetchType.EAGER)
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
    @JoinTable(
        name = "cart_product",
        joinColumns = @JoinColumn(name = "cart_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> productos;
    

    public Cart() {
    }

    public Cart(Long id, User usuario, List<Product> productos) {
        this.id = id;
        this.usuario = usuario;
        this.productos = productos;
    }

    public Cart(User usuario, Product producto) {
        this.usuario = usuario;
        this.productos = new ArrayList<>();
        this.productos.add(producto);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUsuario() {
        return usuario;
    }

    

    public void setUsuario(User usuario) {
        this.usuario = usuario;
    }

    public List<Product> getProductos() {
        return productos;
    }

    public void setProductos(List<Product> productos) {
        this.productos = productos;
    }

    @Override
    public String toString() {
        return "Cart [id=" + id + ", usuario=" + usuario + ", productos=" + productos + "]";
    }

    
}
