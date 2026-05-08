package com.avicola.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

// ─────────────────────────────────────────────────────────────────
//  MODELO: Usuario
//
//  Representa a una persona que puede iniciar sesión en el sistema.
//  @Entity  → Spring sabe que esta clase es una tabla en la BD
//  @Table   → nombre de la tabla en la BD
//  @Data    → Lombok genera getters, setters, toString, equals
//  @NoArgsConstructor → Lombok genera constructor vacío (necesario para JPA)
// ─────────────────────────────────────────────────────────────────
@Data
@NoArgsConstructor
@Entity
@Table(name = "usuarios")
public class Usuario {

    // @Id → esta columna es la clave primaria (PK)
    // @GeneratedValue → el valor lo genera la BD automáticamente (auto-increment)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    // @NotBlank → no puede estar vacío (validación automática)
    @NotBlank(message = "El nombre es obligatorio")
    @Column(nullable = false, length = 120)
    private String nombre;

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    // @Email → valida que tenga formato correo@dominio.com
    // @Column unique = true → no pueden existir dos usuarios con el mismo correo
    @Email
    @NotBlank(message = "El correo es obligatorio")
    @Column(nullable = false, unique = true, length = 160)
    private String email;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    // La contraseña se guarda encriptada con BCrypt (nunca en texto plano)
    @NotBlank
    @Column(nullable = false, length = 255)
    private String password;

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    // Rol del usuario: "admin" o "usuario"
    @NotBlank
    @Column(nullable = false, length = 30)
    private String rol;

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
}
