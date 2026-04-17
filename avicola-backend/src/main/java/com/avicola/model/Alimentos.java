package com.avicola.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

// ─────────────────────────────────────────────────────────────────
//  MODELO: Alimentos
//
//  Registra cuánto alimento se le dio a un galpón en un día.
//  Marca del alimento, etapa de la gallina y kilos consumidos.
// ─────────────────────────────────────────────────────────────────
@Data
@NoArgsConstructor
@Entity
@Table(name = "alimentos")
public class Alimentos {

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

    // Marca del alimento (ej: ProLay Feed Pro, NutriAve Plus...)
    @NotBlank(message = "La marca es obligatoria")
    @Column(name = "marca_alimento", nullable = false, length = 150)
    private String marcaAlimento;

    // Etapa de la gallina (ej: Postura, Crecimiento...)
    @NotBlank(message = "La etapa es obligatoria")
    @Column(name = "etapa_alimento", nullable = false, length = 100)
    private String etapaAlimento;

    // Fecha en que se suministró el alimento
    @NotNull(message = "La fecha es obligatoria")
    @Column(name = "fecha_consumo", nullable = false)
    private LocalDate fechaConsumo;

    // Cuántos kilogramos se dieron
    @NotNull(message = "La cantidad es obligatoria")
    @DecimalMin(value = "0.1", message = "La cantidad debe ser mayor a 0")
    @Column(name = "cantidad_kg", nullable = false)
    private Double cantidadKg;
}
