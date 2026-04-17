package com.avicola.service;

import com.avicola.model.Usuario;
import com.avicola.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

// ─────────────────────────────────────────────────────────────────
//  SERVICIO: AuthService
//
//  Contiene la lógica de autenticación:
//    - login:    verificar correo y contraseña
//    - register: crear un usuario nuevo
//    - update:   actualizar nombre o contraseña del perfil
//
//  El @Service le dice a Spring que esta clase es un servicio
//  y la gestiona automáticamente (la inyecta donde se necesite).
// ─────────────────────────────────────────────────────────────────
@Service
@RequiredArgsConstructor  // Lombok genera el constructor con los campos final
public class AuthService {

    private final UsuarioRepository usuarioRepository;

    // BCrypt encripta contraseñas. Nunca guardamos la contraseña real.
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // ── Login ────────────────────────────────────────────────────
    // Recibe email y password, devuelve el Usuario si son correctos.
    // Lanza una excepción si algo falla (el controller la captura).
    public Usuario login(String email, String password) {
        // 1. Buscar usuario por correo
        Usuario usuario = usuarioRepository.findByEmail(email.trim().toLowerCase())
            .orElseThrow(() -> new RuntimeException("Correo o contraseña incorrectos"));

        // 2. Verificar que la contraseña ingresada coincide con el hash guardado
        if (!encoder.matches(password, usuario.getPassword())) {
            throw new RuntimeException("Correo o contraseña incorrectos");
        }

        return usuario;
    }

    // ── Registro ─────────────────────────────────────────────────
    // Crea un usuario nuevo. Si el correo ya existe, lanza error.
    public Usuario register(String nombre, String email, String password, String rol) {
        String correo = email.trim().toLowerCase();

        // Verificar que el correo no esté registrado
        if (usuarioRepository.existsByEmail(correo)) {
            throw new RuntimeException("Este correo ya está registrado");
        }

        Usuario nuevo = new Usuario();
        nuevo.setNombre(nombre.trim());
        nuevo.setEmail(correo);
        nuevo.setPassword(encoder.encode(password));  // Encriptar antes de guardar
        nuevo.setRol(rol != null ? rol : "usuario");  // Por defecto rol "usuario"

        return usuarioRepository.save(nuevo);
    }

    // ── Actualizar perfil ─────────────────────────────────────────
    // Actualiza nombre y/o contraseña. El correo no se puede cambiar.
    public Usuario actualizarPerfil(String email, String nombre, String nuevaPassword) {
        Usuario usuario = usuarioRepository.findByEmail(email.trim().toLowerCase())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (nombre != null && !nombre.isBlank()) {
            usuario.setNombre(nombre.trim());
        }

        // Solo cambiar contraseña si se envió una nueva
        if (nuevaPassword != null && !nuevaPassword.isBlank()) {
            usuario.setPassword(encoder.encode(nuevaPassword));
        }

        return usuarioRepository.save(usuario);
    }
}
