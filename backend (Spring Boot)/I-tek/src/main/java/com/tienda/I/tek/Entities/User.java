package com.tienda.I.tek.Entities;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import com.tienda.I.tek.Enumerated.Rol;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true) 
    private String nombre; 

    @Column(unique =  false, nullable = false)
    private String email; 

    @Column(nullable = false)
    private String password; 

    @Column(nullable = true)
    private String direccion; 
    
    @Column(nullable = true)
    private String telefono; 

    @Enumerated(EnumType.STRING)
    private Rol rol; 

    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaRegistro;

    @OneToOne(mappedBy = "usuario")
    private Cart cart;

    // Constructor sin parámetros para JPA
    public User() {
    }

    // Constructor con parámetros
    public User(String email, String password, Rol rol, String nombre, String telefono) {
        this.email = email;
        this.password = password;
        this.rol = rol;
        this.nombre = nombre;
        this.telefono = telefono;

    }

    // Otros constructores
    public User(Long id, String nombre, String email, String password, String direccion, String telefono, Rol rol,
            Date fechaRegistro, Cart cart) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.direccion = direccion;
        this.telefono = telefono;
        this.rol = rol;
        this.fechaRegistro = fechaRegistro;
        this.cart = cart;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", nombre=" + nombre + ", email=" + email + ", password=" + password + ", direccion="
                + direccion + ", telefono=" + telefono + ", rol=" + rol + ", fechaRegistro=" + fechaRegistro + ", cart="
                + cart + "]";
    }

    // Métodos de la interfaz UserDetails

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Devolver las autoridades (roles) del usuario, asumiendo que Rol es un enum
        return List.of(() -> "ROLE_" + rol.name());  // Asumiendo que el Rol tiene valores como USER, ADMIN, etc.
    }

    @Override
    public String getUsername() {
        return email;  // El nombre de usuario es el email
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;  // Suponemos que la cuenta no ha expirado
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;  // Suponemos que la cuenta no está bloqueada
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // Las credenciales no han expirado
    }

    @Override
    public boolean isEnabled() {
        return true;  // El usuario está habilitado
    }
}
