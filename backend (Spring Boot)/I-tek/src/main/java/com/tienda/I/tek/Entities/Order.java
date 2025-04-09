package com.tienda.I.tek.Entities;

import java.util.Date;

import com.tienda.I.tek.Enumerated.EstadoPedido;
import com.tienda.I.tek.Enumerated.MetodoPago;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;  

    @Temporal(TemporalType.TIMESTAMP)
    private Date fecha;

    @Enumerated(EnumType.STRING)
    private EstadoPedido estado; 

    @Column(nullable = false)
    private Double total;

    @Enumerated(EnumType.STRING)
    private MetodoPago metodoPago; 

    @Column(nullable = false)
    private String direccionEnvio;

    public Order() {
    }

    public Order(Long id, User user, Date fecha, EstadoPedido estado, Double total, MetodoPago metodoPago, String direccionEnvio) {
        this.id = id;
        this.user = user;
        this.fecha = fecha;
        this.estado = estado;
        this.total = total;
        this.metodoPago = metodoPago;
        this.direccionEnvio = direccionEnvio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public EstadoPedido getEstado() {
        return estado;
    }

    public void setEstado(EstadoPedido estado) {
        this.estado = estado;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public MetodoPago getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(MetodoPago metodoPago) {
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
        return "Order [id=" + id + ", user=" + user + ", fecha=" + fecha + ", estado=" + estado + ", total=" + total
                + ", metodoPago=" + metodoPago + ", direccionEnvio=" + direccionEnvio + "]";
    }
}
