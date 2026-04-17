package com.avicola.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

// ─────────────────────────────────────────────────────────────────
//  MODELO: Mortalidad
//
//  Registra las aves que murieron en un galpón, la fecha y la causa.
//  Al guardar un registro, el servicio descuenta las aves del galpón.
// ─────────────────────────────────────────────────────────────────
@Data
@NoArgsConstructor
@Entity
@Table(name = "mortalidad")
public class Mortalidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_galpon", nullable = false)
    @JsonIgnore
    private Galpon galpon;

    public Long getIdGalpon() {
        return galpon != null ? galpon.getId() : null;
    }

    // Estado de la ave (siempre "Muerta" en este sistema)
    @NotBlank
    @Column(name = "estado_salud", nullable = false, length = 80)
    private String estadoSalud = "Muerta";

    // Fecha en que murieron las aves
    @NotNull(message = "La fecha es obligatoria")
    @Column(name = "fecha_muerte", nullable = false)
    private LocalDate fechaMuerte;

    // Causa de la muerte (ej: Calor excesivo, Enfermedad respiratoria...)
    @NotBlank(message = "La causa es obligatoria")
    @Column(name = "causa_muerte", nullable = false, length = 255)
    private String causaMuerte;

    // Cuántas aves murieron en ese evento
    @NotNull(message = "El número de aves es obligatorio")
    @Min(value = 1, message = "Debe ser al menos 1 ave")
    @Column(name = "numero_aves", nullable = false)
    private Integer numeroAves;
}
