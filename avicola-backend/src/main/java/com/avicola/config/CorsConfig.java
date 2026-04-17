package com.avicola.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// ─────────────────────────────────────────────────────────────────
//  CORS = Cross-Origin Resource Sharing
//
//  Cuando el frontend (localhost:5173) le pide datos al backend
//  (localhost:8080), el navegador por seguridad lo bloquea por
//  defecto porque son "orígenes" diferentes.
//
//  Esta configuración le dice al backend:
//  "Está bien recibir peticiones del frontend en localhost:5173"
// ─────────────────────────────────────────────────────────────────
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    // Lee el origen permitido desde application.properties
    @Value("${app.cors.allowed-origins}")
    private String origenPermitido;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
            // Aplica a todos los endpoints /api/**
            .addMapping("/api/**")
            // Solo permite peticiones del frontend
            .allowedOrigins(origenPermitido)
            // Métodos HTTP permitidos
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            // Permite cualquier header (Content-Type, Authorization, etc.)
            .allowedHeaders("*");
    }
}
