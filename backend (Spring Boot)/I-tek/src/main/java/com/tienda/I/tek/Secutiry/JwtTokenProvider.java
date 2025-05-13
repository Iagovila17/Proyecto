package com.tienda.I.tek.Secutiry;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;

import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;

<<<<<<< HEAD
=======

>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

<<<<<<< HEAD
import com.tienda.I.tek.Entities.CustomUserDetails;
=======

>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

<<<<<<< HEAD
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Component
public class JwtTokenProvider {

    @Autowired
    private UserDetailsService userDetailsService;

=======
@Component
public class JwtTokenProvider {

>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
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
<<<<<<< HEAD
            .setSigningKey(SECRET_KEY)  
=======
            .setSigningKey(SECRET_KEY)
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
            .parseClaimsJws(token);
        return !claims.getBody().getExpiration().before(new Date());
    } catch (JwtException | IllegalArgumentException e) {
        // Aquí puedes loggear más detalles
        System.out.println("Token no válido: " + e.getMessage());
        return false;
    }
}

<<<<<<< HEAD

    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        String username = claims.getSubject();  // Extraemos el 'subject' que debe ser el email
        System.out.println("Token recibido: " + token);
        System.out.println("Subject extraído del token: " + claims.getSubject());
        

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        // Verifica que 'userDetails' sea una instancia de 'CustomUserDetails'
        if (userDetails instanceof CustomUserDetails) {
            return ((CustomUserDetails) userDetails).getEmail();
        } else {
            throw new UsernameNotFoundException("No se pudo encontrar el usuario con email: " + username);
        }
=======
    // Obtener el nombre de usuario desde el token JWT
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        return claims.getSubject();
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
    }

    
    public List<String> getRolesFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        return claims.get("roles", List.class);
    }
}