package com.lareina.avicola.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthDtos {

    // DTO de entrada para login.
    public record LoginRequest(
            @Email @NotBlank String email,
            @NotBlank String password
    ) {}

    // DTO de entrada para registro de usuario.
    public record RegisterRequest(
            @NotBlank String nombre,
            @Email @NotBlank String email,
            @NotBlank String password
    ) {}

    // DTO para editar perfil; password es opcional.
    public record UpdateProfileRequest(
            @NotBlank String nombre,
            String password
    ) {}

    // DTO de salida sin exponer contraseña.
    public record UserResponse(
            Long id,
            String nombre,
            String email,
            String rol
    ) {}
}
