package com.tienda.I.tek.Entities;

import java.util.Date;

import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "orderhistories")
public class OrderHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date fecha;
    private Double total;
    private String metodoPago;
    private String direccionEnvio;

    @ManyToOne
    private User usuario;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Order order;

    public OrderHistory() {
    }

   

    public OrderHistory(Long id, Date fecha, Double total, String metodoPago, String direccionEnvio, User usuario,
            Order order) {
        this.id = id;
        this.fecha = fecha;
        this.total = total;
        this.metodoPago = metodoPago;
        this.direccionEnvio = direccionEnvio;
        this.usuario = usuario;
        this.order = order;
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

    public User getUsuario() {
        return usuario;
    }

    public void setUsuario(User usuario) {
        this.usuario = usuario;
    }



    public Order getOrder() {
        return order;
    }



    public void setOrder(Order order) {
        this.order = order;
    }



    @Override
    public String toString() {
        return "OrderHistory [id=" + id + ", fecha=" + fecha + ", total=" + total + ", metodoPago=" + metodoPago
                + ", direccionEnvio=" + direccionEnvio + ", usuario=" + usuario + ", order=" + order + "]";
    }

    
}
