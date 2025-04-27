package com.tienda.I.tek.Config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) { // Configuración de CORS el mensaje en amarillo solo es una advertencia 
        registry.addMapping("/**") // Permite el acceso a todos los endpoints
            .allowedOrigins("http://localhost:5174") // Permite las peticiones desde React en el puerto 5174
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
            .allowedHeaders("*"); // Permite todos los headers
    }
}