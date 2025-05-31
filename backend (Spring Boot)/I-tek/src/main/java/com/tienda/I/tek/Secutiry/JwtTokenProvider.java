package com.tienda.I.tek.Secutiry;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;

import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;

import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.tienda.I.tek.Entities.CustomUserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Component
public class JwtTokenProvider {

    @Autowired
    private UserDetailsService userDetailsService;

    private final String SECRET_KEY = "a-very-long-secret-string-with-at-least-256-bits-long-length-should-be-difficult-to-guess"; 
    private final long EXPIRATION_TIME = 2592000000L; 

    // Generar un token JWT
    public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();

    Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
    List<String> roles = authorities.stream()
            .map(GrantedAuthority::getAuthority)      
            .map(role -> role.replace("ROLE_", ""))    
            .collect(Collectors.toList());

    claims.put("roles", roles);

    return Jwts.builder()
            .setClaims(claims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) 
            .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
            .compact();
}

    public boolean validateToken(String token) {
    try {
        Jws<Claims> claims = Jwts.parser()
            .setSigningKey(SECRET_KEY)  
            .parseClaimsJws(token);
        return !claims.getBody().getExpiration().before(new Date());
    } catch (JwtException | IllegalArgumentException e) {
        System.out.println("Token no válido: " + e.getMessage());
        return false;
    }
}


    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        String username = claims.getSubject();  
        System.out.println("Token recibido: " + token);
        System.out.println("Subject extraído del token: " + claims.getSubject());
        
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (userDetails instanceof CustomUserDetails) {
            return ((CustomUserDetails) userDetails).getEmail();
        } else {
            throw new UsernameNotFoundException("No se pudo encontrar el usuario con email: " + username);
        }
    }

    
    public List<String> getRolesFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        return claims.get("roles", List.class);
    }
}