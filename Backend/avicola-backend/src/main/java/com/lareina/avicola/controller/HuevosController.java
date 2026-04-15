package com.lareina.avicola.controller;

import com.lareina.avicola.model.Huevos;
import com.lareina.avicola.service.HuevosService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/huevos")
@RequiredArgsConstructor
public class HuevosController {

    private final HuevosService huevosService;

    // GET /api/huevos
    @GetMapping
    public ResponseEntity<List<Huevos>> listarTodos() {
        return ResponseEntity.ok(huevosService.listarTodos());
    }

    // GET /api/huevos/galpon/1
    @GetMapping("/galpon/{idGalpon}")
    public ResponseEntity<List<Huevos>> listarPorGalpon(@PathVariable Long idGalpon) {
        return ResponseEntity.ok(huevosService.listarPorGalpon(idGalpon));
    }

    // GET /api/huevos/fecha?fecha=2026-04-09
    @GetMapping("/fecha")
    public ResponseEntity<List<Huevos>> listarPorFecha(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ResponseEntity.ok(huevosService.listarPorFecha(fecha));
    }

    // GET /api/huevos/total?fecha=2026-04-09
    @GetMapping("/total")
    public ResponseEntity<Long> totalPorFecha(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ResponseEntity.ok(huevosService.totalHuevosPorFecha(fecha));
    }

    // GET /api/huevos/1
    @GetMapping("/{id}")
    public ResponseEntity<Huevos> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(huevosService.buscarPorId(id));
    }

    // POST /api/huevos?idGalpon=1
    @PostMapping
    public ResponseEntity<Huevos> crear(@Valid @RequestBody Huevos huevos,
                                        @RequestParam Long idGalpon) {
        return ResponseEntity.status(HttpStatus.CREATED).body(huevosService.crear(huevos, idGalpon));
    }

    // PUT /api/huevos/1?idGalpon=1
    @PutMapping("/{id}")
    public ResponseEntity<Huevos> actualizar(@PathVariable Long id,
                                             @Valid @RequestBody Huevos huevos,
                                             @RequestParam Long idGalpon) {
        return ResponseEntity.ok(huevosService.actualizar(id, huevos, idGalpon));
    }

    // DELETE /api/huevos/1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        huevosService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
