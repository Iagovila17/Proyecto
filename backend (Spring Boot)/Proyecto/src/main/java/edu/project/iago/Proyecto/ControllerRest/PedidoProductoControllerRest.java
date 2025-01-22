package edu.project.iago.Proyecto.ControllerRest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.project.iago.Proyecto.Service.PedidoProductoService;

@RestController
@RequestMapping("pedidoProducto")
public class PedidoProductoControllerRest {

    @Autowired
    private PedidoProductoService pedidoProductoService;

}
