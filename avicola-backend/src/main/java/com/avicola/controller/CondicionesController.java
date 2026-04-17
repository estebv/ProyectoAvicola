package com.avicola.controller;

import com.avicola.model.Condiciones;
import com.avicola.service.CondicionesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

// ─────────────────────────────────────────────────────────────────
//  CONTROLADOR: CondicionesController
//
//  Endpoints:
//    GET    /api/condiciones                    → todos
//    GET    /api/condiciones/{id}               → uno por ID
//    GET    /api/condiciones/galpon/{idGalpon}  → de un galpón
//    POST   /api/condiciones?idGalpon=1         → crear
//    PUT    /api/condiciones/{id}?idGalpon=1    → actualizar
//    DELETE /api/condiciones/{id}               → eliminar
// ─────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api/condiciones")
@RequiredArgsConstructor
public class CondicionesController {

    private final CondicionesService condicionesService;

    @GetMapping
    public ResponseEntity<List<Condiciones>> listarTodos() {
        return ResponseEntity.ok(condicionesService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(condicionesService.buscarPorId(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/galpon/{idGalpon}")
    public ResponseEntity<List<Condiciones>> listarPorGalpon(@PathVariable Long idGalpon) {
        return ResponseEntity.ok(condicionesService.listarPorGalpon(idGalpon));
    }

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody Condiciones condiciones, @RequestParam Long idGalpon) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(condicionesService.crear(condiciones, idGalpon));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id,
                                        @Valid @RequestBody Condiciones condiciones,
                                        @RequestParam Long idGalpon) {
        try {
            return ResponseEntity.ok(condicionesService.actualizar(id, condiciones, idGalpon));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            condicionesService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }
}
