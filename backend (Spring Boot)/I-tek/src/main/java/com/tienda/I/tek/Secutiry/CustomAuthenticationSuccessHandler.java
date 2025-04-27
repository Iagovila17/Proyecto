package com.tienda.I.tek.Secutiry;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.ServletException;

import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        // Obtener el rol del usuario
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        // Verificar si el usuario es ADMIN
        if (authorities.stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            response.sendRedirect("/admin/dashboard");
        } else {
            // Redirigir a la página de inicio para los usuarios normales
            response.sendRedirect("/inicio");
        }
    }
}