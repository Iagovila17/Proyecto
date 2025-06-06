package com.tienda.I.tek.Entities;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tienda.I.tek.Enumerated.Rol;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

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
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true) 
    private String username; 

    @Column(unique =  true, nullable = false)
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
    private LocalDateTime fechaRegistro;

    @Column(nullable = false)
    private boolean enabled = false;

    @JsonIgnore
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Cart> carts ;

    public User() {
    }

    public User(String email, String password, Rol rol, String nombre, String telefono) {
        this.email = email;
        this.password = password;
        this.rol = rol;
        this.username = nombre;
        this.telefono = telefono;

    }
    
    public Long getId() {
        return id;
    }

    public User(Long id, String nombre, String email, String password, String direccion, String telefono, Rol rol,
            LocalDateTime fechaRegistro, List<Cart> carts) {
        this.id = id;
        this.username = nombre;
        this.email = email;
        this.password = password;
        this.direccion = direccion;
        this.telefono = telefono;
        this.rol = rol;
        this.fechaRegistro = fechaRegistro;
        this.carts = carts;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return username;
    }

    public void setNombre(String nombre) {
        this.username = nombre;
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

    public LocalDateTime  getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public List<Cart> getCarts() {
        return carts;
    }

    public void setCarts(List<Cart> carts) {
        this.carts = carts;
    }

     @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> "ROLE_" + rol.name());  
    }

    @Override
    public String getUsername() {
        return email;  
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;  
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;  
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; 
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", nombre=" + username + ", email=" + email + ", password=" + password
                + ", direccion=" + direccion + ", telefono=" + telefono + ", rol=" + rol + ", fechaRegistro="
                + fechaRegistro + "]";
    }  
}
