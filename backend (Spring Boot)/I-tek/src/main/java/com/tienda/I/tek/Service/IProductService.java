package com.tienda.I.tek.Service;

import java.util.List;


import com.tienda.I.tek.Entities.Product;

public interface IProductService {

    //Rest 
    public List<Product> ListProduct();
    public void saveProduct(Product product);
    public void updateProduct(Product product);
    public void deleteProduct(Long id);
    
    //Controller Rest sin public 
     List<Product> getByCategoriaAndFamilia(String categoria, String familia);
     Product getProductoById(Long id);


}
