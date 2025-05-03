package com.tienda.I.tek.Repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tienda.I.tek.Entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // Busca un usuario por su email
    boolean existsByEmail(String email); // Verifica si el email ya existe en la base de datos
}
