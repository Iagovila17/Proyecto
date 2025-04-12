package com.tienda.I.tek.ControllerRest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.I.tek.Entities.Product;
import com.tienda.I.tek.Service.Productervice;


@RestController
@RequestMapping("/Product")
public class ProductControllerRest {

    @Autowired
    private Productervice ProductServi;

    @GetMapping("/list")
    public List<Product> ListProduct() {
    return ProductServi.ListProduct();
    }

    @PostMapping("/save")
    public void saveProduct(Product product) {
        ProductServi.saveProduct(product);
    }

    @PutMapping("/update")
    public void updateProduct(Product product) {
        ProductServi.updateProduct(product);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable("id")Long id) {
        ProductServi.deleteProduct(id);
    }
}
