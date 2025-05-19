package com.tienda.I.tek.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tienda.I.tek.DTO.ProductDTO;
import com.tienda.I.tek.Entities.Product;
import com.tienda.I.tek.Enumerated.Categoria;
import com.tienda.I.tek.Repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductService implements IProductService{

     @Autowired
    private ProductRepository productRepo; 

    public ProductService(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    @Override
    @Transactional
    public List<Product> getByCategoriaAndFamilia(String categoriaStr, String familia) {
    Categoria categoria;

    try {
        categoria = Categoria.valueOf(categoriaStr.toUpperCase()); // Convertir a Enum
    } catch (IllegalArgumentException e) {
        throw new RuntimeException("Categoría no válida: " + categoriaStr);
    }

    if (familia.equalsIgnoreCase("TODOS")) {
        return productRepo.findByCategoria(categoria);
    } else {
        return productRepo.findByCategoriaAndFamilia(categoria, familia.toUpperCase());
    }
}

    @Override
    public Product getProductoById(Long id) {
        return productRepo.findById(id).orElse(null);
    }

    public List<Product> obtenerTodosLosProductos() {
        return productRepo.findAll();
    }

    @Override
    public void saveProduct(Product product) {
        productRepo.save(product);
      }

    public Product actualizarProducto(Long id, Product nuevoProducto) {
    Product producto = productRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

    producto.setNombre(nuevoProducto.getNombre());
    producto.setFamilia(nuevoProducto.getFamilia());
    producto.setDescripcion(nuevoProducto.getDescripcion());
    producto.setReferencia(nuevoProducto.getReferencia());
    producto.setComposicion(nuevoProducto.getComposicion());
    producto.setCuidados(nuevoProducto.getCuidados());
    producto.setPrecio(nuevoProducto.getPrecio());
    producto.setStock(nuevoProducto.getStock());
    producto.setImagen(nuevoProducto.getImagen());
    producto.setImagen2(nuevoProducto.getImagen2());
    producto.setImagen3(nuevoProducto.getImagen3());
    producto.setTamaño(nuevoProducto.getTamaño());
    producto.setColor(nuevoProducto.getColor());
    producto.setCategoria(nuevoProducto.getCategoria());

    return productRepo.save(producto);
}

    public void deleteProduct(Long id) {
    productRepo.deleteById(id);
}

    public List<Product> buscarPorNombreReferenciaYCategoria(String query, String categoria) {
        return productRepo.findByNombreContainingIgnoreCaseOrReferenciaContainingIgnoreCaseAndCategoria(query, query, categoria);
    }

    public List<Product> searchByNombreOrReferencia(String query) {
        return productRepo.findByNombreContainingIgnoreCaseOrReferenciaContainingIgnoreCase(query, query);
    }


    public List<ProductDTO> getAllProducts() {
        List<Product> productos = productRepo.findAll();
        return productos.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setNombre(product.getNombre());
        dto.setPrecio(product.getPrecio());
        dto.setImagen(product.getImagen());
        // Add other fields as needed
        return dto;
    }

	

	

}
