package com.tienda.I.tek.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tienda.I.tek.Entities.PasswordResetToken;
import com.tienda.I.tek.Entities.User;

public interface PasswordResetRepository extends JpaRepository<PasswordResetToken, Long> {
    // Buscar un token por el valor del token
    Optional<PasswordResetToken> findByToken(String token);

    // Opcional: Buscar por el usuario si es necesario
    Optional<PasswordResetToken> findByUser(User user);
}