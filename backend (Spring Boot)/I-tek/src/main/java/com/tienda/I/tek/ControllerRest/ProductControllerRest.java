package com.tienda.I.tek.ControllerRest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.I.tek.Entities.Product;
import com.tienda.I.tek.Service.ProductService;


@RestController
@RequestMapping("/Product")
public class ProductControllerRest {

    @Autowired
    private ProductService ProductServi;

    public ProductControllerRest(ProductService ProductServi) {
        this.ProductServi = ProductServi;
    }

    @GetMapping("/byCategoriaFamilia")
    public List<Product> getByCategoriaAndFamilia(
            @RequestParam String categoria,
            @RequestParam String familia) {
        return ProductServi.getByCategoriaAndFamilia(categoria.toUpperCase(), familia.toUpperCase());
    }

     @GetMapping("/listar") // primero rutas literales
    public ResponseEntity<List<Product>> obtenerProductos() {
        List<Product> productos = ProductServi.obtenerTodosLosProductos();
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductoById(@PathVariable Long id) {
        Product producto = ProductServi.getProductoById(id);
        if (producto != null) {
            return ResponseEntity.ok(producto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    // Búsqueda con categoría
    @GetMapping("/search")
    public List<Product> buscarProductos(
        @RequestParam String query,
        @RequestParam String categoria
    ) {
        return ProductServi.buscarPorNombreReferenciaYCategoria(query, categoria);
    }

    @GetMapping("/search/all")
    public List<Product> buscarProductosSinCategoria(@RequestParam String query) {
        return ProductServi.buscarPorNombreOReferencia(query);
    }

   

    @PostMapping("/save")
    public ResponseEntity<String> saveProduct(@RequestBody Product product) {
        ProductServi.saveProduct(product);
        return ResponseEntity.ok("Producto guardado correctamente");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> actualizarProducto(@PathVariable Long id, @RequestBody Product productoActualizado) {
        Product producto = ProductServi.actualizarProducto(id, productoActualizado);
        return ResponseEntity.ok(producto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Long id) {
        ProductServi.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable("id")Long id) {
        ProductServi.deleteProduct(id);
    }
}
