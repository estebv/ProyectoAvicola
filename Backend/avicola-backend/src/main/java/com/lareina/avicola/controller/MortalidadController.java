package com.lareina.avicola.controller;

import com.lareina.avicola.model.Mortalidad;
import com.lareina.avicola.service.MortalidadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/mortalidad")
@RequiredArgsConstructor
public class MortalidadController {

    private final MortalidadService mortalidadService;

    // GET /api/mortalidad
    @GetMapping
    public ResponseEntity<List<Mortalidad>> listarTodos() {
        return ResponseEntity.ok(mortalidadService.listarTodos());
    }

    // GET /api/mortalidad/galpon/1
    @GetMapping("/galpon/{idGalpon}")
    public ResponseEntity<List<Mortalidad>> listarPorGalpon(@PathVariable Long idGalpon) {
        return ResponseEntity.ok(mortalidadService.listarPorGalpon(idGalpon));
    }

    // GET /api/mortalidad/fecha?fecha=2026-04-09
    @GetMapping("/fecha")
    public ResponseEntity<List<Mortalidad>> listarPorFecha(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ResponseEntity.ok(mortalidadService.listarPorFecha(fecha));
    }

    // GET /api/mortalidad/total/galpon/1
    @GetMapping("/total/galpon/{idGalpon}")
    public ResponseEntity<Integer> totalPorGalpon(@PathVariable Long idGalpon) {
        return ResponseEntity.ok(mortalidadService.totalMuertesPorGalpon(idGalpon));
    }

    // GET /api/mortalidad/1
    @GetMapping("/{id}")
    public ResponseEntity<Mortalidad> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(mortalidadService.buscarPorId(id));
    }

    // POST /api/mortalidad?idGalpon=1
    @PostMapping
    public ResponseEntity<Mortalidad> crear(@Valid @RequestBody Mortalidad mortalidad,
                                            @RequestParam Long idGalpon) {
        return ResponseEntity.status(HttpStatus.CREATED).body(mortalidadService.crear(mortalidad, idGalpon));
    }

    // PUT /api/mortalidad/1?idGalpon=1
    @PutMapping("/{id}")
    public ResponseEntity<Mortalidad> actualizar(@PathVariable Long id,
                                                 @Valid @RequestBody Mortalidad mortalidad,
                                                 @RequestParam Long idGalpon) {
        return ResponseEntity.ok(mortalidadService.actualizar(id, mortalidad, idGalpon));
    }

    // DELETE /api/mortalidad/1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        mortalidadService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
