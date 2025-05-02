package com.tienda.I.tek.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tienda.I.tek.Entities.Product;
import com.tienda.I.tek.Enumerated.Categoria;
import com.tienda.I.tek.Repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductService implements IProductService{

     @Autowired
    private ProductRepository productRepo; 

    @Autowired
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

    @Override
    public List<Product> ListProduct() {
        return productRepo.findAll();
    }

    @Override
    public void saveProduct(Product product) {
        productRepo.save(product);
      }

    @Override
    public void updateProduct(Product product) {
        Product existngProduct = productRepo.findById(product.getId()).orElse(null);
        if(existngProduct != null){
            existngProduct.setNombre(product.getNombre());
            existngProduct.setDescripcion(product.getDescripcion());
            existngProduct.setPrecio(product.getPrecio());
            existngProduct.setStock(product.getStock());
            existngProduct.setImagen(product.getImagen());
            existngProduct.setTamaño(product.getTamaño());
            existngProduct.setColor(product.getColor());
            existngProduct.setCategoria(product.getCategoria());
            productRepo.save(existngProduct);
        }
    }

    @Override
    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }

    public List<Product> buscarPorNombreReferenciaYCategoria(String query, String categoria) {
        return productRepo.findByNombreContainingIgnoreCaseOrReferenciaContainingIgnoreCaseAndCategoria(query, query, categoria);
    }

    public List<Product> searchByNombreOrReferencia(String query) {
        return productRepo.findByNombreContainingIgnoreCaseOrReferenciaContainingIgnoreCase(query, query);
    }

}
