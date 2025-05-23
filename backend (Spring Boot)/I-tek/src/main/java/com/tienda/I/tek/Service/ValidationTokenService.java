package com.tienda.I.tek.Service;

import java.util.Optional;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Entities.ValidationToken;
import com.tienda.I.tek.Repository.VerificationTokenRepository;

@Service
public class ValidationTokenService {

    @Autowired
    private VerificationTokenRepository tokenRepository;

    public ValidationToken createToken(User user) {
        ValidationToken token = new ValidationToken();
        token.setUser(user);
        token.setToken(UUID.randomUUID().toString());
        token.setExpiryDate(LocalDateTime.now().plusHours(12)); // 24h para confirmar
        return tokenRepository.save(token);
    }

    public Optional<ValidationToken> findByToken(String token) {
        return Optional.ofNullable(tokenRepository.findByToken(token));
    }

    public void deleteToken(ValidationToken token) {
        tokenRepository.delete(token);
    }
}