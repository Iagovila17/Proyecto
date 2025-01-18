package edu.project.iago.Proyecto.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.project.iago.Proyecto.entities.Carrito;

public interface CarritoRepository extends JpaRepository<Carrito, Long> {
    

}
