package com.tienda.I.tek.DTO;

public class ProductDTO {
    private Long id;
    private String nombre;
    private Double precio;
    private Integer cantidad;
    private String talla;
    private String imagen;
    private String referencia;
    private Integer quantity;
    private Double totalPrice;
    private int stock;
    
    public ProductDTO() {
    }
    public ProductDTO(String nombre, Double precio, Integer cantidad, String talla, String imagen) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.talla = talla;
        this.imagen = imagen;
    }

     public ProductDTO(String nombre, String imagen, String talla, Integer quantity, Double totalPrice) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.talla = talla;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }

    public ProductDTO(Long id,String referencia, String nombre, int stock) {
        this.id = id;
        this.referencia = referencia;
        this.nombre = nombre;
        this.stock = stock;
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
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public Double getPrecio() {
        return precio;
    }
    public void setPrecio(Double precio) {
        this.precio = precio;
    }
    public Integer getCantidad() {
        return cantidad;
    }
    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
    public String getTalla() {
        return talla;
    }
    public void setTalla(String talla) {
        this.talla = talla;
    }
    public String getImagen() {
        return imagen;
    }
    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public int getStock() {
        return stock;
    }
    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getReferencia() {
        return referencia;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }


    @Override
    public String toString() {
        return "ProductDTO{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", precio=" + precio +
                ", cantidad=" + cantidad +
                ", talla='" + talla + '\'' +
                ", imagen='" + imagen + '\'' +
                ", referencia='" + referencia + '\'' +
                ", quantity=" + quantity +
                ", totalPrice=" + totalPrice +
                ", stock=" + stock +
                '}';
    }
   
    

    
}
