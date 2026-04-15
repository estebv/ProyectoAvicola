package com.lareina.avicola.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name = "aves")
public class Aves {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ave_id")
    private Long id;

    @NotBlank(message = "La raza es obligatoria")
    @Column(nullable = false, length = 100)
    private String raza;

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    @Column(name = "fecha_nacimiento", nullable = false)
    private LocalDate fechaNacimiento;

    @NotNull(message = "La fecha de llegada es obligatoria")
    @Column(name = "fecha_llegada", nullable = false)
    private LocalDate fechaLlegada;

    @NotBlank(message = "El origen es obligatorio")
    @Column(nullable = false, length = 150)
    private String origen;

    @Min(value = 1, message = "El total de aves debe ser al menos 1")
    @Column(name = "total_aves", nullable = false)
    private Integer totalAves;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_galpon", nullable = false)
    private Galpon galpon;
}
