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

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Galpon getGalpon() { return galpon; }
    public void setGalpon(Galpon galpon) { this.galpon = galpon; }

    public Long getIdGalpon() {
        return galpon != null ? galpon.getId() : null;
    }

    // Estado de la ave (siempre "Muerta" en este sistema)
    @NotBlank
    @Column(name = "estado_salud", nullable = false, length = 80)
    private String estadoSalud = "Muerta";

    public String getEstadoSalud() { return estadoSalud; }
    public void setEstadoSalud(String estadoSalud) { this.estadoSalud = estadoSalud; }

    // Fecha en que murieron las aves
    @NotNull(message = "La fecha es obligatoria")
    @Column(name = "fecha_muerte", nullable = false)
    private LocalDate fechaMuerte;

    public LocalDate getFechaMuerte() { return fechaMuerte; }
    public void setFechaMuerte(LocalDate fechaMuerte) { this.fechaMuerte = fechaMuerte; }

    // Causa de la muerte (ej: Calor excesivo, Enfermedad respiratoria...)
    @NotBlank(message = "La causa es obligatoria")
    @Column(name = "causa_muerte", nullable = false, length = 255)
    private String causaMuerte;

    public String getCausaMuerte() { return causaMuerte; }
    public void setCausaMuerte(String causaMuerte) { this.causaMuerte = causaMuerte; }

    // Cuántas aves murieron en ese evento
    @NotNull(message = "El número de aves es obligatorio")
    @Min(value = 1, message = "Debe ser al menos 1 ave")
    @Column(name = "numero_aves", nullable = false)
    private Integer numeroAves;

    public Integer getNumeroAves() { return numeroAves; }
    public void setNumeroAves(Integer numeroAves) { this.numeroAves = numeroAves; }
}
