package com.lareina.avicola.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name = "mortalidad")
public class Mortalidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mortalidad_id")
    private Long id;

    @NotBlank(message = "El estado de salud es obligatorio")
    @Column(name = "estado_salud", nullable = false, length = 100)
    private String estadoSalud;

    @NotNull(message = "La fecha de muerte es obligatoria")
    @Column(name = "fecha_muerte", nullable = false)
    private LocalDate fechaMuerte;

    @Column(name = "causa_muerte", length = 200)
    private String causaMuerte;

    @NotNull(message = "El número de aves es obligatorio")
    @Min(value = 1, message = "Debe registrarse al menos 1 ave")
    @Column(name = "numero_aves", nullable = false)
    private Integer numeroAves;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_galpon", nullable = false)
    private Galpon galpon;
}
