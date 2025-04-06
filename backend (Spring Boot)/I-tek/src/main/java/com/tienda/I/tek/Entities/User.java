package com.tienda.I.tek.Entities;


import java.util.Date;

import com.tienda.I.tek.Enumerated.Rol;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false) 
    private String nombre; 

    @Column(unique =  true, nullable = false)
    private String email; 

    @Column(nullable = false)
    private String contraseña; 

    @Column(nullable = true)
    private String direccion; 
    
    @Column(nullable = true)
    private String telefono; 

    @Enumerated(EnumType.STRING)
    private Rol rol; 

    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaRegistro;

    public User() {
    }

    public User(Long id, String nombre, String email, String contraseña, String direccion, String telefono, Rol rol,
            Date fechaRegistro) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.contraseña = contraseña;
        this.direccion = direccion;
        this.telefono = telefono;
        this.rol = rol;
        this.fechaRegistro = fechaRegistro;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public Date getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(Date fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", nombre=" + nombre + ", email=" + email + ", contraseña=" + contraseña
                + ", direccion=" + direccion + ", telefono=" + telefono + ", rol=" + rol + ", fechaRegistro="
                + fechaRegistro + "]";
    } 


    
}
