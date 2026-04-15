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
@Table(name = "condiciones_ambientales")
public class CondicionesAmbientales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_condiciones")
    private Long id;

    @NotNull(message = "La fecha es obligatoria")
    @Column(nullable = false)
    private LocalDate fecha;

    @Column(precision = 5, scale = 2)
    private BigDecimal temperatura;

    @Column(precision = 5, scale = 2)
    private BigDecimal humedad;

    @Column(length = 50)
    private String ventilacion;

    @Column(length = 50)
    private String iluminacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_galpon", nullable = false)
    private Galpon galpon;
}
