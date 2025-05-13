package com.tienda.I.tek.Secutiry;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.util.List;
import java.util.stream.Collectors;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider, CustomUserDetailsService userDetailsService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userDetailsService = userDetailsService;
    }

    @Override
protected void doFilterInternal(HttpServletRequest request,
                                 HttpServletResponse response,
                                 FilterChain filterChain) throws ServletException, IOException {

    String path = request.getRequestURI();

    // OMITIR rutas públicas
    if (path.equals("/Product/byCategoriaFamilia") ||
        path.matches("/Product/\\d+") ||
        path.equals("/Product/search") ||
        path.matches("/search/.*") ||
        path.equals("/auth/login") ||
        path.equals("/auth/register")) {
        filterChain.doFilter(request, response);
        return;
    }

    String token = getTokenFromRequest(request);

    if (token != null && jwtTokenProvider.validateToken(token)) {
        String username = jwtTokenProvider.getEmailFromToken(token);
        List<String> roles = jwtTokenProvider.getRolesFromToken(token);

        List<GrantedAuthority> authorities = roles.stream()
            .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
            .collect(Collectors.toList());

        UsernamePasswordAuthenticationToken auth =
            new UsernamePasswordAuthenticationToken(username, null, authorities);

        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(auth);
    } else {
        // Log para ver si el token es nulo o inválido
        System.out.println("Token no válido o ausente para la solicitud: " + request.getRequestURI());
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        return;
    }

    filterChain.doFilter(request, response);
}

    private String getTokenFromRequest(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }
}