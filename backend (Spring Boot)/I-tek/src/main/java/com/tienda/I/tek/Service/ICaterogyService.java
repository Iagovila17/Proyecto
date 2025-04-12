package com.tienda.I.tek.Service;

import java.util.List;

import com.tienda.I.tek.Entities.Category;

public interface ICaterogyService {

    //Rest
    public List<Category> listCategory();
    public void saveCategory(Category category);
    public void updateCategory(Category category);
    public void delelteCategory(Long id);
}
