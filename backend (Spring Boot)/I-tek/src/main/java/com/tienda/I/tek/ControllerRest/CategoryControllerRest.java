package com.tienda.I.tek.ControllerRest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.I.tek.Entities.Category;
import com.tienda.I.tek.Service.CategoryService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;




@RestController
@RequestMapping("/Category")
public class CategoryControllerRest {

    @Autowired
    CategoryService categoryServi;

    @GetMapping("/list")
    public List<Category> listCategory() {
        return categoryServi.listCategory();
    }
    
    @PostMapping("/save")
    public void saveCategory(Category category) {
        categoryServi.saveCategory(category);
    }
    
    @PutMapping("/update")
    public void updateCategory(Category category) {
        categoryServi.updateCategory(category);
    }

    @DeleteMapping("/delete/{id}")
    public void delelteCategory(Long id) {
        categoryServi.delelteCategory(id);
    }
    
    
}
