package com.tienda.I.tek.Entities;

import java.util.Date;

import com.tienda.I.tek.Enumerated.EstadoPedido;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "orderhistories")
public class OrderHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Order pedido;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User usuario;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaActualizacion;

    @Enumerated(EnumType.STRING)
    private EstadoPedido estadoAnterior;

    @Enumerated(EnumType.STRING)
    private EstadoPedido estadoNuevo;
}
