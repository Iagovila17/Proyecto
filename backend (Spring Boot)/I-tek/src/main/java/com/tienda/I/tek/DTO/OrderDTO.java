package com.tienda.I.tek.DTO;

import java.util.Date;

import com.tienda.I.tek.Entities.Order;

public class OrderDTO {

    private Long id;
    private Date fecha;
    private String estado;
    private Double total;
    private String metodoPago;
    private String direccionEnvio;
   
    public OrderDTO() {
    }

    public OrderDTO(Order order) {
        this.id = order.getId();
        this.fecha = (Date) order.getFecha();
        this.estado = order.getEstado().toString();
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

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

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
        return "OrderDTO [id=" + id + ", fecha=" + fecha + ", estado=" + estado + ", total=" + total + ", metodoPago="
                + metodoPago + ", direccionEnvio=" + direccionEnvio + "]";
    }
}
