package edu.project.iago.Proyecto.ControllerRest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.project.iago.Proyecto.Service.ProductoService;

@RestController
@RequestMapping("producto")
public class ProductoControllerRest {

    @Autowired
    private ProductoService productoService;

}
