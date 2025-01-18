package edu.project.iago.Proyecto.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.project.iago.Proyecto.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
