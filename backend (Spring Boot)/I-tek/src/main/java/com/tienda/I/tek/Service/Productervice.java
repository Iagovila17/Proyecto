package com.tienda.I.tek.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tienda.I.tek.Entities.Product;
import com.tienda.I.tek.Repository.ProductRepository;

@Service
public class Productervice implements IProductService{

     @Autowired
    private ProductRepository productRepo; 


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

}
