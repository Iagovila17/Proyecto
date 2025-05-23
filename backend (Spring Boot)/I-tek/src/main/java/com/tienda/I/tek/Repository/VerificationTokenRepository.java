package com.tienda.I.tek.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tienda.I.tek.Entities.ValidationToken;


public interface VerificationTokenRepository extends JpaRepository<ValidationToken, Long> {
    ValidationToken findByToken(String token);
}