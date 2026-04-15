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
@Table(name = "alimentos")
public class Alimentos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alimento_id")
    private Long id;

    @NotBlank(message = "La marca del alimento es obligatoria")
    @Column(name = "marca_alimento", nullable = false, length = 150)
    private String marcaAlimento;

    @NotBlank(message = "La etapa del alimento es obligatoria")
    @Column(name = "etapa_alimento", nullable = false, length = 100)
    private String etapaAlimento;

    @NotNull(message = "La fecha de consumo es obligatoria")
    @Column(name = "fecha_consumo", nullable = false)
    private LocalDate fechaConsumo;

    @NotNull(message = "La cantidad es obligatoria")
    @DecimalMin(value = "0.0", inclusive = false, message = "La cantidad debe ser mayor a 0")
    @Column(name = "cantidad_kg", nullable = false, precision = 8, scale = 2)
    private BigDecimal cantidadKg;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_galpon", nullable = false)
    private Galpon galpon;
}
