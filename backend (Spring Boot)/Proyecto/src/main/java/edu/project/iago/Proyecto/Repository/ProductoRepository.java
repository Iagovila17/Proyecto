package edu.project.iago.Proyecto.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.project.iago.Proyecto.entities.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

}
