package com.avicola.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

// ─────────────────────────────────────────────────────────────────
//  MODELO: Galpon
//
//  Representa un galpón de la granja avícola.
//  Tiene número, cuántas aves hay, la raza y el estado.
// ─────────────────────────────────────────────────────────────────
@Data
@NoArgsConstructor
@Entity
@Table(name = "galpon")
public class Galpon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Número del galpón (ej: 1, 2, 3...)
    // unique = true → no pueden existir dos galpones con el mismo número
    @NotNull(message = "El número del galpón es obligatorio")
    @Column(nullable = false, unique = true)
    private Integer numero;

    // Cuántas aves hay en el galpón ahora mismo
    @Min(value = 0, message = "El número de aves no puede ser negativo")
    @Column(name = "numero_aves", nullable = false)
    private Integer numeroAves = 0;

    // Raza de las aves de este galpón (ej: Lohmann, Hy-Line...)
    @NotBlank(message = "La raza es obligatoria")
    @Column(nullable = false, length = 100)
    private String raza;

    // Estado del galpón: "activo", "alerta" o "critico"
    @Column(nullable = false, length = 30)
    private String estado = "activo";
}
