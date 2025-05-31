package com.tienda.I.tek.Entities;

import com.tienda.I.tek.Enumerated.Talla;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_details")
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order; 

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;  

    @Column(nullable = false)
    private Integer quantity;  

    @Column(nullable = false)
    private Double unitPrice; 

    @Column(nullable = false)
    private Double totalPrice; 

    private Talla talla;

    public OrderDetail() {
    }

    

    public OrderDetail(Long id, Order order, Product product, Integer quantity, Double unitPrice, Double totalPrice,
            Talla talla) {
        this.id = id;
        this.order = order;
        this.product = product;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.totalPrice = totalPrice;
        this.talla = talla;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void calculateTotalPrice() {
        this.totalPrice = this.unitPrice * this.quantity;
    }



    public Talla getTalla() {
        return talla;
    }



    public void setTalla(Talla talla) {
        this.talla = talla;
    }

    @Override
    public String toString() {
        return "OrderDetail [id=" + id + ", order=" + order + ", product=" + product + ", quantity=" + quantity
                + ", unitPrice=" + unitPrice + ", totalPrice=" + totalPrice + ", talla=" + talla + "]";
    }

    
}