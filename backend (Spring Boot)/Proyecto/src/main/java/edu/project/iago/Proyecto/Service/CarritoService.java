package edu.project.iago.Proyecto.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.project.iago.Proyecto.Repository.CarritoRepository;

@Service
public class CarritoService implements  ICarrito{

    @Autowired
    private CarritoRepository carritoRepository;

}
