package com.tienda.I.tek.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.tienda.I.tek.Enumerated.Talla;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cart_items")
public class Cartitem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonBackReference
    private Cart cart;

    @ManyToOne
    private Product product;

    private Integer cantidad;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Talla talla;

    public Cartitem() {
    }

    public Cartitem(Long id, Cart cart, Product product, Integer cantidad, Talla talla) {
        this.id = id;
        this.cart = cart;
        this.product = product;
        this.cantidad = cantidad;
        this.talla = talla;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Talla getTalla() {
        return talla;
    }

    public void setTalla(Talla talla) {
        this.talla = talla;
    }

    @Override
    public String toString() {
        return "Cartitem [id=" + id + ", cart=" + cart + ", product=" + product + ", cantidad=" + cantidad + ", talla="
                + talla + "]";
    }
}
