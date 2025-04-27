package com.tienda.I.tek.Secutiry;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import com.tienda.I.tek.Entities.User;

import java.util.Date;

@Component
public class JwtTokenProvider {

    private final String SECRET_KEY = "miClaveSecreta"; // Cambia esto por una clave más segura
    private final long EXPIRATION_TIME = 2592000000L; // 30 días


    // Generar un token JWT
    public String generateToken(User user) {
        return Jwts.builder()
            .setSubject(user.getNombre())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
            .compact();
    }

    // Validar un token JWT
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Obtener el nombre de usuario desde el token JWT
    public String getUsernameFromToken(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getSubject();
    }
    
}