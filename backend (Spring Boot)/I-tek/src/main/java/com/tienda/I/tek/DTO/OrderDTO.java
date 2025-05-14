package com.tienda.I.tek.DTO;

import java.util.Date;
import java.util.List;

import com.tienda.I.tek.Entities.Order;
import com.tienda.I.tek.Enumerated.EstadoPedido;
import com.tienda.I.tek.Enumerated.MetodoPago;

public class OrderDTO {
    private Long id;
    private Date fecha;
    private Double total;
    private MetodoPago metodoPago;
    private String direccionEnvio;
    private EstadoPedido estado;
    private List<OrderDetailDTO> products;

    public OrderDTO(Long id, Date fecha, Double total, MetodoPago metodoPago, String direccionEnvio, EstadoPedido estado, List<OrderDetailDTO> products) {
        this.id = id;
        this.fecha = fecha;
        this.total = total;
        this.metodoPago = metodoPago;
        this.direccionEnvio = direccionEnvio;
        this.estado = estado;
        this.products = products;
    }

     public OrderDTO(Order order) {
        this.id = order.getId();
        this.fecha = order.getFecha();
        this.total = order.getTotal();
        this.metodoPago = order.getMetodoPago();
        this.direccionEnvio = order.getDireccionEnvio();
        this.estado = order.getEstado();

        // Convertimos la lista de OrderDetail a OrderDetailDTO

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


    public List<OrderDetailDTO> getProducts() {
        return products;
    }

    public void setProducts(List<OrderDetailDTO> products) {
        this.products = products;
    }

    public EstadoPedido getEstado() {
        return estado;
    }

    public void setEstado(EstadoPedido estado) {
        this.estado = estado;
    }

    // Getters and Setters


}