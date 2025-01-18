package edu.project.iago.Proyecto.entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "carritos")
public class Carrito {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    @Column(name = "total")
    private Double total;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

     @OneToMany(mappedBy = "carrito", cascade = CascadeType.ALL)
    private Set<CarritoProducto> carritoProductos = new HashSet<>();


    //conmstructor
    public Carrito() {}

    
    public Carrito(Long id, Double total, User user, Set<CarritoProducto> carritoProductos) {
        this.id = id;
        this.total = total;
        this.user = user;
        this.carritoProductos = carritoProductos;
    }

    //getters y setters
    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public Double getTotal() {
        return total;
    }


    public void setTotal(Double total) {
        this.total = total;
    }


    public User getUser() {
        return user;
    }


    public void setUser(User user) {
        this.user = user;
    }


    public Set<CarritoProducto> getCarritoProductos() {
        return carritoProductos;
    }


    public void setCarritoProductos(Set<CarritoProducto> carritoProductos) {
        this.carritoProductos = carritoProductos;
    }

    //toString
    @Override
    public String toString() {
        return "Carrito [carritoProductos=" + carritoProductos + ", id=" + id + ", total=" + total + ", user=" + user
                + "]";
    }

}
