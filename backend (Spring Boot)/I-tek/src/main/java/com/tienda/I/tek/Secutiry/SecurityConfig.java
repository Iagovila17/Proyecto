package com.tienda.I.tek.Secutiry;

import java.util.List;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
<<<<<<< HEAD
import org.springframework.http.HttpMethod;
=======
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
                          CustomUserDetailsService userDetailsService) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(request -> {
                
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOriginPatterns(List.of("*")); // <-- Usa allowedOriginPatterns para permitir todos los orígenes 
                config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                config.setAllowedHeaders(List.of("*"));
                config.setAllowCredentials(true);
                return config;
            }))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/Product/byCategoriaFamilia").permitAll()
                .requestMatchers("/Product/*").permitAll()
                .requestMatchers("/search/*").permitAll()
                .requestMatchers("/Product/search/*").permitAll()
                .requestMatchers("/auth/login", "/auth/register").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
<<<<<<< HEAD
                .requestMatchers("/cesta" ).hasRole("USER")
                .requestMatchers(HttpMethod.POST, "/checkout").hasRole("USER")
=======
                .requestMatchers("/cesta").hasRole("USER")
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
                .requestMatchers("/auth/reset-password", "/auth/change-password").authenticated() 
                .requestMatchers("/cesta/add/{productId}").hasRole("USER")  // Asegúrate de que esta ruta esté protegida
                .anyRequest().authenticated()
            )
             .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // <-- Añadir esto
        return http.build();
        
    }
<<<<<<< HEAD
=======
    
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}