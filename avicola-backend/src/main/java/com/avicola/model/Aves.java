package com.avicola.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

// ─────────────────────────────────────────────────────────────────
//  MODELO: Aves
//
//  Representa un lote de aves en un galpón.
//  Cada lote tiene su raza, fecha de nacimiento, origen, etc.
//
//  Relación: Aves pertenece a un Galpon (muchos a uno)
//  Un galpón puede tener varios lotes de aves registrados.
// ─────────────────────────────────────────────────────────────────
@Data
@NoArgsConstructor
@Entity
@Table(name = "aves")
public class Aves {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // @JsonIgnore → cuando el backend devuelve JSON, no incluye
    //               el objeto Galpon completo (evita datos innecesarios).
    //               En cambio, getIdGalpon() devuelve solo el ID.
    // @ManyToOne  → muchos lotes de aves pueden estar en el mismo galpón
    // @JoinColumn → el nombre de la columna FK en la tabla aves
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_galpon", nullable = false)
    @JsonIgnore
    private Galpon galpon;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Galpon getGalpon() { return galpon; }
    public void setGalpon(Galpon galpon) { this.galpon = galpon; }

    public Long getIdGalpon() {
        return galpon != null ? galpon.getId() : null;
    }

    @NotBlank(message = "La raza es obligatoria")
    @Column(nullable = false, length = 100)
    private String raza;

    public String getRaza() { return raza; }
    public void setRaza(String raza) { this.raza = raza; }

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    @Column(name = "fecha_nacimiento", nullable = false)
    private LocalDate fechaNacimiento;

    public LocalDate getFechaNacimiento() { return fechaNacimiento; }
    public void setFechaNacimiento(LocalDate fechaNacimiento) { this.fechaNacimiento = fechaNacimiento; }

    @NotNull(message = "La fecha de llegada es obligatoria")
    @Column(name = "fecha_llegada", nullable = false)
    private LocalDate fechaLlegada;

    public LocalDate getFechaLlegada() { return fechaLlegada; }
    public void setFechaLlegada(LocalDate fechaLlegada) { this.fechaLlegada = fechaLlegada; }

    @NotBlank(message = "El origen es obligatorio")
    @Column(nullable = false, length = 150)
    private String origen;

    public String getOrigen() { return origen; }
    public void setOrigen(String origen) { this.origen = origen; }

    @Min(value = 1, message = "Debe haber al menos 1 ave")
    @Column(name = "total_aves", nullable = false)
    private Integer totalAves;

    public Integer getTotalAves() { return totalAves; }
    public void setTotalAves(Integer totalAves) { this.totalAves = totalAves; }
}
