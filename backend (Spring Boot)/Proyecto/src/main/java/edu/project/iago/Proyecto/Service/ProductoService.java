package edu.project.iago.Proyecto.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.project.iago.Proyecto.Repository.ProductoRepository;

@Service
public class ProductoService implements IProducto {

    @Autowired  
    private ProductoRepository productoRepository;

}
