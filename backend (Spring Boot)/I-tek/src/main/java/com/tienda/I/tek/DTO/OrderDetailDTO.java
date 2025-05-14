package com.tienda.I.tek.DTO;

import com.tienda.I.tek.Entities.OrderDetail;

public class OrderDetailDTO {
    private Long productId;
    private String productName;
    private Double unitPrice;
    private Integer quantity;
    private Double totalPrice;
    private String productImage;
    private String talla;

    public OrderDetailDTO(OrderDetail orderDetail) {
        this.productId = orderDetail.getProduct().getId();
        this.productName = orderDetail.getProduct().getNombre();
        this.unitPrice = orderDetail.getUnitPrice();
        this.quantity = orderDetail.getQuantity();
        this.productImage = orderDetail.getProduct().getImagen();
        this.totalPrice = orderDetail.getTotalPrice();
        this.talla = orderDetail.getTalla().toString(); // Si `talla` es un Enum, usar toString() para la representación
    }

    // Getters and Setters

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getTalla() {
        return talla;
    }

    public void setTalla(String talla) {
        this.talla = talla;
    }

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

    
}