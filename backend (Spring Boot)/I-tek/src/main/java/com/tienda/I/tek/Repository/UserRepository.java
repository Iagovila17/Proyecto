package com.tienda.I.tek.Repository;

<<<<<<< HEAD
=======


>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tienda.I.tek.Entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
<<<<<<< HEAD
    Optional<User> findByEmail(String email); 
    boolean existsByEmail(String email);
    Optional<User> findByUsername(String username);
=======
    Optional<User> findByEmail(String email); // Busca un usuario por su email
    boolean existsByEmail(String email); // Verifica si el email ya existe en la base de datos
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
}
