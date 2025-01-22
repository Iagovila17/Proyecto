package edu.project.iago.Proyecto.ControllerRest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.project.iago.Proyecto.Service.CarritoService;

@RestController
@RequestMapping("carrito")
public class CarritoControllerRest {

    @Autowired
    private CarritoService carritoService;
    

}
