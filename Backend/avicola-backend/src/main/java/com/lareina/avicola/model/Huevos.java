package com.lareina.avicola.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name = "huevos")
public class Huevos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "huevo_id")
    private Long id;

    @NotNull(message = "La fecha de puesta es obligatoria")
    @Column(name = "fecha_puesta", nullable = false)
    private LocalDate fechaPuesta;

    @NotNull(message = "El peso del huevo es obligatorio")
    @DecimalMin(value = "0.0", inclusive = false, message = "El peso debe ser mayor a 0")
    @Column(name = "peso_huevo", nullable = false, precision = 5, scale = 2)
    private BigDecimal pesoHuevo;

    @NotNull(message = "La calidad es obligatoria")
    @Min(value = 1, message = "La calidad mínima es 1")
    @Max(value = 5, message = "La calidad máxima es 5")
    @Column(name = "calidad_huevo", nullable = false)
    private Integer calidadHuevo;

    @NotNull(message = "El total de huevos es obligatorio")
    @Min(value = 0, message = "El total no puede ser negativo")
    @Column(name = "total_huevo", nullable = false)
    private Integer totalHuevo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_galpon", nullable = false)
    private Galpon galpon;
}
