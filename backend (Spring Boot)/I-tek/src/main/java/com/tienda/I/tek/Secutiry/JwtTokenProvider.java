package com.tienda.I.tek.Secutiry;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;

import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;


import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;



import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    private final String SECRET_KEY = "a-very-long-secret-string-with-at-least-256-bits-long-length-should-be-difficult-to-guess"; // Cambiar por una clave más segura
    private final long EXPIRATION_TIME = 2592000000L; // 30 días en milisegundos

    // Generar un token JWT
    public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();

    Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
    List<String> roles = authorities.stream()
            .map(GrantedAuthority::getAuthority)       // "ROLE_USER"
            .map(role -> role.replace("ROLE_", ""))    // solo "USER"
            .collect(Collectors.toList());

    claims.put("roles", roles);

    return Jwts.builder()
            .setClaims(claims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // 30 días
            .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
            .compact();
}

    // Validar un token JWT
    public boolean validateToken(String token) {
    try {
        Jws<Claims> claims = Jwts.parser()
            .setSigningKey(SECRET_KEY)
            .parseClaimsJws(token);
        return !claims.getBody().getExpiration().before(new Date());
    } catch (JwtException | IllegalArgumentException e) {
        // Aquí puedes loggear más detalles
        System.out.println("Token no válido: " + e.getMessage());
        return false;
    }
}

    // Obtener el nombre de usuario desde el token JWT
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    
    public List<String> getRolesFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        return claims.get("roles", List.class);
    }
}