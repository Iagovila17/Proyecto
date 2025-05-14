package com.tienda.I.tek.DTO;

public class ProductDTO {
    private String nombre;
    private Double precio;
    private Integer cantidad;
    private String talla;
    private String imagen;
    private Integer quantity;
    private Double totalPrice;
    
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
    @Override
    public String toString() {
        return "ProductDTO [nombre=" + nombre + ", precio=" + precio + ", cantidad=" + cantidad + ", talla=" + talla
                + ", imagen=" + imagen + ", quantity=" + quantity + ", totalPrice=" + totalPrice + "]";
    }
   
    

    
}
