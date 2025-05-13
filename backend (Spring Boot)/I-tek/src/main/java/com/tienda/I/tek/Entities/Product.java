package com.tienda.I.tek.Entities;


import java.util.List;

import com.tienda.I.tek.Enumerated.Categoria;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String familia;

    @Column(nullable = false)
    private String nombre;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @Column(nullable = false)
    private String referencia;
    
    @Lob
    @Column(nullable = true, columnDefinition = "TEXT")
    private String composicion;

    @Column(nullable = true, columnDefinition = "TEXT")
    private String cuidados;

    @Column(nullable = false)
    private double precio;

    @Column(nullable = false)
    private int stock;

    @Column(nullable = true)
    private String imagen; // Imagen principal

    @Column(nullable = false)
    private String imagen2;

    @Column(nullable = false)
    private String imagen3;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_tallas", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "talla")
    private List<String> tamaño;

    @Column(nullable = false)
    private String color;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Categoria categoria;

    public Product() {
    }

   

    public Product(Long id, String familia, String nombre, String descripcion, String referencia, double precio,
            int stock, String imagen, List<String> tamaño, String color, Categoria categoria) {
        this.id = id;
        this.familia = familia;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.referencia = referencia;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.tamaño = tamaño;
        this.color = color;
        this.categoria = categoria;
    }



    

    public Product(Long id, String familia, String nombre, String descripcion, String referencia, String composicion,
            String cuidados, double precio, int stock, String imagen, String imagen2, String imagen3,
            List<String> tamaño, String color, Categoria categoria) {
        this.id = id;
        this.familia = familia;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.referencia = referencia;
        this.composicion = composicion;
        this.cuidados = cuidados;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.imagen2 = imagen2;
        this.imagen3 = imagen3;
        this.tamaño = tamaño;
        this.color = color;
        this.categoria = categoria;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFamilia() {
        return familia;
    }

    public void setFamilia(String familia) {
        this.familia = familia;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getReferencia() {
        return referencia;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getImagen2() {
        return imagen2;
    }

    public void setImagen2(String imagen2) {
        this.imagen2 = imagen2;
    }

    public String getImagen3() {
        return imagen3;
    }

    public void setImagen3(String imagen3) {
        this.imagen3 = imagen3;
    }

    public List<String> getTamaño() {
        return tamaño;
    }

    public void setTamaño(List<String> tamaño) {
        this.tamaño = tamaño;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getComposicion() {
        return composicion;
    }

    public void setComposicion(String composicion) {
        this.composicion = composicion;
    }

    public String getCuidados() {
        return cuidados;
    }

    public void setCuidados(String cuidados) {
        this.cuidados = cuidados;
    }


    @Override
    public String toString() {
        return "Product [id=" + id + ", familia=" + familia + ", nombre=" + nombre + ", descripcion=" + descripcion
                + ", referencia=" + referencia + ", composicion=" + composicion + ", cuidados=" + cuidados
                + ", precio=" + precio + ", stock=" + stock + ", imagen=" + imagen + ", imagen2=" + imagen2
                + ", imagen3=" + imagen3 + ", tamaño=" + tamaño + ", color=" + color + ", categoria=" + categoria + "]";
    }

    
}