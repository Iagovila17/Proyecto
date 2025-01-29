package edu.project.iago.Proyecto.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="subcategorias")
public class Subcategoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
   
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "descripcion", nullable = false, length = 100)
    private String descripcion;

    public Subcategoria (){}


    public Subcategoria(String id, String nombre, String descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }


    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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


    @Override
    public String toString() {
        return "Subcategoria [id=" + id + ", nombre=" + nombre + ", descripcion=" + descripcion + "]";
    }
}
