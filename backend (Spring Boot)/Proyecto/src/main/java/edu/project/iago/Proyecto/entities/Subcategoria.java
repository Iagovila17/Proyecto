package edu.project.iago.Proyecto.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

    @Entity
    @Table(name="subcategorias")
    public class Subcategoria {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
    
        @Column(name = "nombre", nullable = false, length = 100)
        private String nombre;

        @Column(name = "descripcion", nullable = false, length = 100)
        private String descripcion;

        @ManyToOne
        @JoinColumn(name = "categoria_id", nullable = false)
        private Categoria categoria;

        @OneToMany(mappedBy = "subcategoria", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<Producto> productos;

        public Subcategoria (){}


        public Subcategoria(Long id, String nombre, String descripcion) {
            this.id = id;
            this.nombre = nombre;
            this.descripcion = descripcion;
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
