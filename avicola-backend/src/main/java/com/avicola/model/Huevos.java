package com.avicola.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

// ─────────────────────────────────────────────────────────────────
//  MODELO: Huevos
//
//  Registra la producción de huevos de un galpón en un día.
//  Cuántos huevos se recogieron, su peso promedio y calidad.
// ─────────────────────────────────────────────────────────────────
@Data
@NoArgsConstructor
@Entity
@Table(name = "huevos")
public class Huevos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_galpon", nullable = false)
    @JsonIgnore
    private Galpon galpon;

    // Devuelve solo el ID del galpón en el JSON → "id_galpon"
    public Long getIdGalpon() {
        return galpon != null ? galpon.getId() : null;
    }

    // Fecha en que se recogieron los huevos
    @NotNull(message = "La fecha es obligatoria")
    @Column(name = "fecha_puesta", nullable = false)
    private LocalDate fechaPuesta;

    // Peso promedio de cada huevo en gramos
    @NotNull(message = "El peso es obligatorio")
    @DecimalMin(value = "0.1", message = "El peso debe ser mayor a 0")
    @Column(name = "peso_huevo", nullable = false)
    private Double pesoHuevo;

    // Calidad del huevo del 1 (muy mala) al 5 (excelente)
    @NotNull(message = "La calidad es obligatoria")
    @Min(value = 1) @Max(value = 5)
    @Column(name = "calidad_huevo", nullable = false)
    private Integer calidadHuevo;

    // Total de huevos recogidos ese día en ese galpón
    @NotNull(message = "El total es obligatorio")
    @Min(value = 0)
    @Column(name = "total_huevo", nullable = false)
    private Integer totalHuevo;
}
