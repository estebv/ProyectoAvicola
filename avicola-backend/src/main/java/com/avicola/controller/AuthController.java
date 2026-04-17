package com.avicola.controller;

import com.avicola.model.Usuario;
import com.avicola.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

// ─────────────────────────────────────────────────────────────────
//  CONTROLADOR: AuthController
//
//  Es la "puerta de entrada" del backend para autenticación.
//  Recibe las peticiones HTTP del frontend y las delega al servicio.
//
//  @RestController → esta clase maneja peticiones REST (JSON)
//  @RequestMapping → todas las rutas empiezan con /api/auth
// ─────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // ── POST /api/auth/login ─────────────────────────────────────
    // El frontend envía: { "email": "...", "password": "..." }
    // Devuelve: { "id": 1, "nombre": "...", "email": "...", "rol": "admin" }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        try {
            Usuario usuario = authService.login(body.get("email"), body.get("password"));
            return ResponseEntity.ok(toRespuesta(usuario));
        } catch (RuntimeException e) {
            // Si las credenciales son incorrectas, devolvemos 401
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", e.getMessage()));
        }
    }

    // ── POST /api/auth/register ──────────────────────────────────
    // El frontend envía: { "nombre": "...", "email": "...", "password": "...", "rol": "..." }
    // Devuelve: el usuario creado (sin contraseña)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        try {
            Usuario usuario = authService.register(
                body.get("nombre"),
                body.get("email"),
                body.get("password"),
                body.get("rol")
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(toRespuesta(usuario));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", e.getMessage()));
        }
    }

    // ── PUT /api/auth/perfil?email=correo@x.com ──────────────────
    // El frontend envía: { "nombre": "...", "password": "..." }
    // Devuelve: el usuario actualizado
    @PutMapping("/perfil")
    public ResponseEntity<?> actualizarPerfil(
            @RequestParam String email,
            @RequestBody Map<String, String> body) {
        try {
            Usuario usuario = authService.actualizarPerfil(
                email,
                body.get("nombre"),
                body.get("password")
            );
            return ResponseEntity.ok(toRespuesta(usuario));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", e.getMessage()));
        }
    }

    // ── Convierte Usuario a Map sin incluir la contraseña ─────────
    // Nunca mandamos la contraseña encriptada al frontend.
    private Map<String, Object> toRespuesta(Usuario u) {
        return Map.of(
            "id",     u.getId(),
            "nombre", u.getNombre(),
            "email",  u.getEmail(),
            "rol",    u.getRol()
        );
    }
}
