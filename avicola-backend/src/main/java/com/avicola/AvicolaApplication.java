package com.avicola;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// ─────────────────────────────────────────────────────
//  Punto de entrada de toda la aplicación Spring Boot.
//  Al correr esta clase, el servidor se levanta en
//  http://localhost:8080
// ─────────────────────────────────────────────────────
@SpringBootApplication
public class AvicolaApplication {

    public static void main(String[] args) {
        SpringApplication.run(AvicolaApplication.class, args);
    }

}
