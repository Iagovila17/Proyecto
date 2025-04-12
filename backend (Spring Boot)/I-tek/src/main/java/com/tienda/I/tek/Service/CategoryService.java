package com.tienda.I.tek.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tienda.I.tek.Entities.Category;
import com.tienda.I.tek.Repository.CategoryRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CategoryService implements ICaterogyService{

    @Autowired 
    private CategoryRepository CategoryRepo;

    @Override
    public List<Category> listCategory() {
        return CategoryRepo.findAll();
    }

    @Override
    public void saveCategory(Category category) {
        CategoryRepo.save(category);
    }

    @Override
    public void updateCategory(Category category) {
        Category existingCategory = CategoryRepo.findById(category.getId()).orElse(null);
        if (existingCategory != null) {
            existingCategory.setNombre(category.getNombre());
            existingCategory.setDescripcion(category.getDescripcion());
            existingCategory.setProductos(category.getProductos());
            CategoryRepo.save(existingCategory);
        } else {
            throw new EntityNotFoundException("Categoría no encontrada con el ID: " + category.getId());
        }
    }

    @Override
    public void delelteCategory(Long id) {
        CategoryRepo.deleteById(id);
    }

}