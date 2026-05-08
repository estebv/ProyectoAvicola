package com.avicola.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

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

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    // Número del galpón (ej: 1, 2, 3...)
    // unique = true → no pueden existir dos galpones con el mismo número
    @NotNull(message = "El número del galpón es obligatorio")
    @Column(nullable = false, unique = true)
    private Integer numero;

    public Integer getNumero() { return numero; }
    public void setNumero(Integer numero) { this.numero = numero; }

    // Cuántas aves hay en el galpón ahora mismo
    @Min(value = 0, message = "El número de aves no puede ser negativo")
    @Column(name = "numero_aves", nullable = false)
    private Integer numeroAves = 0;

    public Integer getNumeroAves() { return numeroAves; }
    public void setNumeroAves(Integer numeroAves) { this.numeroAves = numeroAves; }

    // Raza de las aves de este galpón (ej: Lohmann, Hy-Line...)
    @NotBlank(message = "La raza es obligatoria")
    @Column(nullable = false, length = 100)
    private String raza;

    public String getRaza() { return raza; }
    public void setRaza(String raza) { this.raza = raza; }

    // Estado del galpón: "activo", "alerta" o "critico"
    @Column(nullable = false, length = 30)
    private String estado = "activo";

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    // ── Relaciones con eliminación en cascada ──────────────────
    
    @OneToMany(mappedBy = "galpon", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Aves> lotesAves;

    @OneToMany(mappedBy = "galpon", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Huevos> registrosHuevos;

    @OneToMany(mappedBy = "galpon", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Alimentos> registrosAlimentos;

    @OneToMany(mappedBy = "galpon", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Mortalidad> registrosMortalidad;

    @OneToMany(mappedBy = "galpon", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Condiciones> registrosCondiciones;

    public List<Aves> getLotesAves() { return lotesAves; }
    public void setLotesAves(List<Aves> lotesAves) { this.lotesAves = lotesAves; }

    public List<Huevos> getRegistrosHuevos() { return registrosHuevos; }
    public void setRegistrosHuevos(List<Huevos> registrosHuevos) { this.registrosHuevos = registrosHuevos; }

    public List<Alimentos> getRegistrosAlimentos() { return registrosAlimentos; }
    public void setRegistrosAlimentos(List<Alimentos> registrosAlimentos) { this.registrosAlimentos = registrosAlimentos; }

    public List<Mortalidad> getRegistrosMortalidad() { return registrosMortalidad; }
    public void setRegistrosMortalidad(List<Mortalidad> registrosMortalidad) { this.registrosMortalidad = registrosMortalidad; }

    public List<Condiciones> getRegistrosCondiciones() { return registrosCondiciones; }
    public void setRegistrosCondiciones(List<Condiciones> registrosCondiciones) { this.registrosCondiciones = registrosCondiciones; }
}
