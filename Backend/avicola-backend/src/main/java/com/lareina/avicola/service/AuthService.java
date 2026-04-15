package com.lareina.avicola.service;

import com.lareina.avicola.dto.AuthDtos;
import com.lareina.avicola.exception.RecursoNoEncontradoException;
import com.lareina.avicola.model.Usuario;
import com.lareina.avicola.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
// Lógica central de autenticación y perfil de usuario.
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    // BCrypt cifra y valida contraseñas de forma segura.
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional(readOnly = true)
    public AuthDtos.UserResponse login(AuthDtos.LoginRequest request) {
        // 1) Buscar usuario por email normalizado.
        Usuario usuario = usuarioRepository.findByEmail(request.email().trim().toLowerCase())
                .orElseThrow(() -> new IllegalArgumentException("Correo o contraseña incorrectos"));

        // 2) Comparar contraseña ingresada contra hash almacenado.
        boolean passwordOk = passwordEncoder.matches(request.password(), usuario.getPassword());
        if (!passwordOk) throw new IllegalArgumentException("Correo o contraseña incorrectos");

        // 3) Retornar perfil público para frontend.
        return toResponse(usuario);
    }

    @Transactional
    public AuthDtos.UserResponse register(AuthDtos.RegisterRequest request) {
        String email = request.email().trim().toLowerCase();
        // Validación de unicidad para evitar duplicados.
        if (usuarioRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Este correo ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.nombre().trim());
        usuario.setEmail(email);
        // Nunca guardar contraseña en texto plano.
        usuario.setPassword(passwordEncoder.encode(request.password()));
        usuario.setRol("operario");

        return toResponse(usuarioRepository.save(usuario));
    }

    @Transactional
    public AuthDtos.UserResponse updateProfile(String email, AuthDtos.UpdateProfileRequest request) {
        // El perfil se edita por email (alineado al frontend actual).
        Usuario usuario = usuarioRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado"));

        usuario.setNombre(request.nombre().trim());
        if (request.password() != null && !request.password().isBlank()) {
            usuario.setPassword(passwordEncoder.encode(request.password()));
        }

        return toResponse(usuarioRepository.save(usuario));
    }

    // Mapper simple de entidad -> DTO de respuesta.
    private AuthDtos.UserResponse toResponse(Usuario usuario) {
        return new AuthDtos.UserResponse(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getEmail(),
                usuario.getRol()
        );
    }
}
