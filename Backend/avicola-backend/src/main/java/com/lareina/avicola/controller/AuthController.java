package com.lareina.avicola.controller;

import com.lareina.avicola.dto.AuthDtos;
import com.lareina.avicola.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
// Controlador de autenticación:
// expone login, registro y actualización de perfil.
public class AuthController {

    private final AuthService authService;

    // Inicia sesión y devuelve el perfil básico del usuario.
    @PostMapping("/login")
    public ResponseEntity<AuthDtos.UserResponse> login(@Valid @RequestBody AuthDtos.LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    // Registra un usuario nuevo con rol operario por defecto.
    @PostMapping("/register")
    public ResponseEntity<AuthDtos.UserResponse> register(@Valid @RequestBody AuthDtos.RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    // Perfil simple por email (alineado con frontend actual).
    @PutMapping("/profile")
    public ResponseEntity<AuthDtos.UserResponse> updateProfile(
            @RequestParam String email,
            @Valid @RequestBody AuthDtos.UpdateProfileRequest request
    ) {
        return ResponseEntity.ok(authService.updateProfile(email, request));
    }
}
