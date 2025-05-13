package com.tienda.I.tek.DTO;

import java.util.Date;

import com.tienda.I.tek.Entities.Order;

public class OrderDTO {

    private Long id;
    private Date fecha;
<<<<<<< HEAD
   
=======
    private String estado;
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
    private Double total;
    private String metodoPago;
    private String direccionEnvio;
   
    public OrderDTO() {
    }

    public OrderDTO(Order order) {
        this.id = order.getId();
        this.fecha = (Date) order.getFecha();
<<<<<<< HEAD
=======
        this.estado = order.getEstado().toString();
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
        this.total = order.getTotal();
        this.metodoPago = order.getMetodoPago().toString();
        this.direccionEnvio = order.getDireccionEnvio();
    }

   
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

<<<<<<< HEAD
=======
    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }

    public String getDireccionEnvio() {
        return direccionEnvio;
    }

    public void setDireccionEnvio(String direccionEnvio) {
        this.direccionEnvio = direccionEnvio;
    }

    @Override
    public String toString() {
<<<<<<< HEAD
        return "OrderDTO [id=" + id + ", fecha=" + fecha + ", total=" + total + ", metodoPago="
=======
        return "OrderDTO [id=" + id + ", fecha=" + fecha + ", estado=" + estado + ", total=" + total + ", metodoPago="
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
                + metodoPago + ", direccionEnvio=" + direccionEnvio + "]";
    }
}
