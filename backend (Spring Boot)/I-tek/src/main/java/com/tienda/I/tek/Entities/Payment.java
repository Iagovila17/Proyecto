package com.tienda.I.tek.Entities;

import java.util.Date;

import com.tienda.I.tek.Enumerated.EstadoPago;
import com.tienda.I.tek.Enumerated.MetodoPago;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "payments")
public class Payment {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(nullable = false)
    private Order pedido;

    @Column(nullable = false)
    private Double monto;

    @Enumerated(EnumType.STRING)
    private MetodoPago metodoPago;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaPago;

    @Enumerated(EnumType.STRING)
    private EstadoPago estado; 
}