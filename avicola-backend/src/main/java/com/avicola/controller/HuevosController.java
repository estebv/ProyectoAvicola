package com.avicola.controller;

import com.avicola.model.Huevos;
import com.avicola.service.HuevosService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

// ─────────────────────────────────────────────────────────────────
//  CONTROLADOR: HuevosController
//
//  Endpoints:
//    GET    /api/huevos                    → todos los registros
//    GET    /api/huevos/{id}               → uno por ID
//    GET    /api/huevos/galpon/{idGalpon}  → de un galpón
//    POST   /api/huevos?idGalpon=1         → crear
//    PUT    /api/huevos/{id}?idGalpon=1    → actualizar
//    DELETE /api/huevos/{id}               → eliminar
// ─────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api/huevos")
@RequiredArgsConstructor
public class HuevosController {

    private final HuevosService huevosService;

    @GetMapping
    public ResponseEntity<List<Huevos>> listarTodos() {
        return ResponseEntity.ok(huevosService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(huevosService.buscarPorId(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/galpon/{idGalpon}")
    public ResponseEntity<List<Huevos>> listarPorGalpon(@PathVariable Long idGalpon) {
        return ResponseEntity.ok(huevosService.listarPorGalpon(idGalpon));
    }

    // POST /api/huevos?idGalpon=1
    // Body: { "fecha_puesta": "2026-04-17", "peso_huevo": 58.5,
    //         "calidad_huevo": 4, "total_huevo": 3600 }
    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody Huevos huevos, @RequestParam Long idGalpon) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(huevosService.crear(huevos, idGalpon));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id,
                                        @Valid @RequestBody Huevos huevos,
                                        @RequestParam Long idGalpon) {
        try {
            return ResponseEntity.ok(huevosService.actualizar(id, huevos, idGalpon));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            huevosService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }
}
