package edu.project.iago.Proyecto.entities;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import edu.project.iago.Proyecto.Enumerated.Estado;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name= "total", nullable = false)
    private int total;

    @Column(name= "fecha", nullable = false)
    private LocalDate fecha;

    @Column(name= "estado", nullable = false)
    @Enumerated(EnumType.STRING)
    private Estado estado;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private Set<PedidoProducto> carritoProductos = new HashSet<>();


    //Constructor
    public Pedido() {}


    public Pedido(Long id, int total, LocalDate fecha, Estado estado, Set<PedidoProducto> carritoProductos) {
        this.id = id;
        this.total = total;
        this.fecha = fecha;
        this.estado = estado;
        this.carritoProductos = carritoProductos;
    }

    //Getters y Setters
    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public int getTotal() {
        return total;
    }


    public void setTotal(int total) {
        this.total = total;
    }


    public LocalDate getFecha() {
        return fecha;
    }


    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }


    public Estado getEstado() {
        return estado;
    }


    public void setEstado(Estado estado) {
        this.estado = estado;
    }


    public Set<PedidoProducto> getCarritoProductos() {
        return carritoProductos;
    }


    public void setCarritoProductos(Set<PedidoProducto> carritoProductos) {
        this.carritoProductos = carritoProductos;
    }

    //toString
    @Override
    public String toString() {
        return "Pedido [id=" + id + ", total=" + total + ", fecha=" + fecha + ", estado=" + estado
                + ", carritoProductos=" + carritoProductos + "]";
    }

    
    
}
