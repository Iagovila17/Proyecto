package edu.project.iago.Proyecto.Service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import edu.project.iago.Proyecto.entities.CarritoProducto;

@Service
public class CarritoProductoService implements ICarritoProducto {

    @Autowired
    private CarritoProducto carritoProductoRepository;

}
