package com.lareina.avicola.controller;

import com.lareina.avicola.model.CondicionesAmbientales;
import com.lareina.avicola.service.CondicionesAmbientalesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/condiciones")
@RequiredArgsConstructor
public class CondicionesAmbientalesController {

    private final CondicionesAmbientalesService condicionesService;

    // GET /api/condiciones
    @GetMapping
    public ResponseEntity<List<CondicionesAmbientales>> listarTodos() {
        return ResponseEntity.ok(condicionesService.listarTodos());
    }

    // GET /api/condiciones/galpon/1
    @GetMapping("/galpon/{idGalpon}")
    public ResponseEntity<List<CondicionesAmbientales>> listarPorGalpon(@PathVariable Long idGalpon) {
        return ResponseEntity.ok(condicionesService.listarPorGalpon(idGalpon));
    }

    // GET /api/condiciones/fecha?fecha=2026-04-09
    @GetMapping("/fecha")
    public ResponseEntity<List<CondicionesAmbientales>> listarPorFecha(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ResponseEntity.ok(condicionesService.listarPorFecha(fecha));
    }

    // GET /api/condiciones/1
    @GetMapping("/{id}")
    public ResponseEntity<CondicionesAmbientales> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(condicionesService.buscarPorId(id));
    }

    // POST /api/condiciones?idGalpon=1
    @PostMapping
    public ResponseEntity<CondicionesAmbientales> crear(
            @Valid @RequestBody CondicionesAmbientales condicion,
            @RequestParam Long idGalpon) {
        return ResponseEntity.status(HttpStatus.CREATED).body(condicionesService.crear(condicion, idGalpon));
    }

    // PUT /api/condiciones/1?idGalpon=1
    @PutMapping("/{id}")
    public ResponseEntity<CondicionesAmbientales> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody CondicionesAmbientales condicion,
            @RequestParam Long idGalpon) {
        return ResponseEntity.ok(condicionesService.actualizar(id, condicion, idGalpon));
    }

    // DELETE /api/condiciones/1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        condicionesService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
