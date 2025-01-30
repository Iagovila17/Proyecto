package edu.project.iago.Proyecto.entities;

import java.util.HashSet;
import java.util.Set;

import edu.project.iago.Proyecto.Enumerated.Talla;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "productos")
public class Producto {

    // Atributos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false, length = 250)
    private String nombre;

    @Column(name = "descripcion", nullable = false, length = 250)
    private String descripcion;

    @Column(name = "imagen_url", nullable = false, length = 250)    
    private String imagenUrl;
    
    @Column(name = "precio", nullable = false)
    private double precio; 

    @Column(name = "cantidad_stock", nullable = false)
    private int cantidadStock;

    @Column(name = "material", nullable = false, length = 250)
    private String material;

    @Column(name = "talla", nullable = true)
    @Enumerated(EnumType.STRING)
    private Talla talla;

     // Relación con Subcategoria (Muchos a Uno)
     @ManyToOne
     @JoinColumn(name = "subcategoria_id", nullable = false)
     private Subcategoria subcategoria;


    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private Set<CarritoProducto> carritoProductos = new HashSet<>();

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private Set<PedidoProducto> pedidoProductos = new HashSet<>();

    // Constructores
    public Producto() {}

    // Constructor completo
    public Producto(Long id, String nombre, String descripcion, String imagenUrl, double precio, int cantidadStock,
            String material, Talla talla) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagenUrl = imagenUrl;
        this.precio = precio;
        this.cantidadStock = cantidadStock;
        this.material = material;
        this.talla = talla;
    }
    
    // Constructor sin imagen URL (por si no se tiene una) nos permite crear un producto sin imagen
    public Producto(Long id, String nombre, String descripcion, double precio, int cantidadStock, String material,
            Talla talla) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidadStock = cantidadStock;
        this.material = material;
        this.talla = talla;
    }

    // Getters y Setters
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

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getCantidadStock() {
        return cantidadStock;
    }

    public void setCantidadStock(int cantidadStock) {
        this.cantidadStock = cantidadStock;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public Talla getTalla() {
        return talla;
    }

    public void setTalla(Talla talla) {
        this.talla = talla;
    }

    public Set<CarritoProducto> getCarritoProductos() {
        return carritoProductos;
    }

    public void setCarritoProductos(Set<CarritoProducto> carritoProductos) {
        this.carritoProductos = carritoProductos;
    }

    public Set<PedidoProducto> getPedidoProductos() {
        return pedidoProductos;
    }

    public void setPedidoProductos(Set<PedidoProducto> pedidoProductos) {
        this.pedidoProductos = pedidoProductos;
    }

    //toString
    @Override
    public String toString() {
        return "Producto [cantidadStock=" + cantidadStock + ", descripcion=" + descripcion
                + ", id=" + id + ", imagenUrl=" + imagenUrl + ", material=" + material + ", nombre=" + nombre
                + ", precio=" + precio + ", talla=" + talla + "]";
    }

}
