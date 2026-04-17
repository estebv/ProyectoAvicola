package com.avicola.repository;

import com.avicola.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// ─────────────────────────────────────────────────────────────────
//  REPOSITORIO: UsuarioRepository
//
//  JpaRepository ya trae estos métodos gratis:
//    findAll()       → lista todos los usuarios
//    findById(id)    → busca por ID
//    save(obj)       → guarda o actualiza
//    deleteById(id)  → elimina
//
//  Aquí solo agregamos lo que JPA no trae por defecto.
// ─────────────────────────────────────────────────────────────────
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Busca usuario por correo → lo usamos en el login
    Optional<Usuario> findByEmail(String email);

    // Verifica si ya hay un usuario con ese correo → evitar duplicados
    boolean existsByEmail(String email);
}
