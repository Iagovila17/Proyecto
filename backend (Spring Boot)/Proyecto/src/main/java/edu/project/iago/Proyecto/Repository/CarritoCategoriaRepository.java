package edu.project.iago.Proyecto.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.project.iago.Proyecto.entities.Categoria;

public interface CarritoCategoriaRepository extends JpaRepository<Categoria, Long> {

}
