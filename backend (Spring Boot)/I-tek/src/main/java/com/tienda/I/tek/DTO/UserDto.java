package com.tienda.I.tek.DTO;

import java.sql.Date;

import com.tienda.I.tek.Enumerated.Rol;

public class UserDto {

    private Long id;
    private String nombre;
    private String email;
    private String direccion;
    private String telefono;
    private Rol rol;
    private Date fechaRegistro;

    public UserDto() {
    }

    public UserDto(Long id, String nombre, String email, String direccion, String telefono, Rol rol, Date fechaRegistro) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
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
        return "UserDto [id=" + id + ", nombre=" + nombre + ", email=" + email + ", direccion=" + direccion
                + ", telefono=" + telefono + ", rol=" + rol + ", fechaRegistro=" + fechaRegistro + "]";
    }

    
    

}
