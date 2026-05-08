package com.avicola.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

// ─────────────────────────────────────────────────────────────────
//  MODELO: Condiciones
//
//  Registra las condiciones ambientales de un galpón en un día:
//  temperatura, humedad, ventilación e iluminación.
// ─────────────────────────────────────────────────────────────────
@Data
@NoArgsConstructor
@Entity
@Table(name = "condiciones")
public class Condiciones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    // Fecha del registro ambiental
    @NotNull(message = "La fecha es obligatoria")
    @Column(nullable = false)
    private LocalDate fecha;

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    // Temperatura en grados Celsius (ej: 24.5)
    @NotNull(message = "La temperatura es obligatoria")
    @Column(nullable = false)
    private Double temperatura;

    public Double getTemperatura() { return temperatura; }
    public void setTemperatura(Double temperatura) { this.temperatura = temperatura; }

    // Humedad relativa en porcentaje (ej: 65.0)
    @NotNull(message = "La humedad es obligatoria")
    @Column(nullable = false)
    private Double humedad;

    public Double getHumedad() { return humedad; }
    public void setHumedad(Double humedad) { this.humedad = humedad; }

    // Estado de la ventilación (ej: Buena, Regular, Deficiente...)
    @NotBlank(message = "La ventilación es obligatoria")
    @Column(nullable = false, length = 100)
    private String ventilacion;

    public String getVentilacion() { return ventilacion; }
    public void setVentilacion(String ventilacion) { this.ventilacion = ventilacion; }

    // Horas de luz al día (ej: 16h, 14h...)
    @NotBlank(message = "La iluminación es obligatoria")
    @Column(nullable = false, length = 50)
    private String iluminacion;

    public String getIluminacion() { return iluminacion; }
    public void setIluminacion(String iluminacion) { this.iluminacion = iluminacion; }
}
