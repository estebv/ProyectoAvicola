package com.lareina.avicola.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "galpon")
public class Galpon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_galpon")
    private Long id;

    @NotNull(message = "El número de galpón es obligatorio")
    @Column(name = "numero_galpon", unique = true, nullable = false)
    private Integer numeroGalpon;

    @Min(value = 0, message = "El número de aves no puede ser negativo")
    @Column(name = "numero_aves", nullable = false)
    private Integer numeroAves = 0;
}
