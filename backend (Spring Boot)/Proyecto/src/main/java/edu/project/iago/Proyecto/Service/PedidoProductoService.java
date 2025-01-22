package edu.project.iago.Proyecto.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.project.iago.Proyecto.Repository.PedidoProductoRepository;

@Service
public class PedidoProductoService implements IPedidoProducto {

    @Autowired
    private PedidoProductoRepository pedidoProductoRepository;

}
