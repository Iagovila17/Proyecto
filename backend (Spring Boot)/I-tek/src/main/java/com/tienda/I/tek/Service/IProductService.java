package com.tienda.I.tek.Service;

import java.util.List;


import com.tienda.I.tek.Entities.Product;

public interface IProductService {

    public void saveProduct(Product product);
    public void deleteProduct(Long id);
    
     List<Product> getByCategoriaAndFamilia(String categoria, String familia);
     Product getProductoById(Long id);
      List<Product> obtenerTodosLosProductos();
     


}
