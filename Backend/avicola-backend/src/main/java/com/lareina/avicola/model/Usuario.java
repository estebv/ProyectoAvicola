package com.lareina.avicola.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 120)
    private String nombre;

    @Email
    @NotBlank
    @Column(nullable = false, unique = true, length = 160)
    private String email;

    @NotBlank
    @Column(nullable = false, length = 255)
    private String password;

    @NotBlank
    @Column(nullable = false, length = 30)
    private String rol;
}
