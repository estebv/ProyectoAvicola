package com.avicola.controller;

import com.avicola.model.Galpon;
import com.avicola.service.GalponService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

// ─────────────────────────────────────────────────────────────────
//  CONTROLADOR: GalponController
//
//  Endpoints disponibles:
//    GET    /api/galpones        → listar todos
//    GET    /api/galpones/{id}   → buscar uno por ID
//    POST   /api/galpones        → crear uno nuevo
//    PUT    /api/galpones/{id}   → actualizar
//    DELETE /api/galpones/{id}   → eliminar
// ─────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api/galpones")
@RequiredArgsConstructor
public class GalponController {

    private final GalponService galponService;

    // GET /api/galpones
    @GetMapping
    public ResponseEntity<List<Galpon>> listarTodos() {
        return ResponseEntity.ok(galponService.listarTodos());
    }

    // GET /api/galpones/1
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(galponService.buscarPorId(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", e.getMessage()));
        }
    }

    // POST /api/galpones
    // Body: { "numero": 6, "numero_aves": 4000, "raza": "Lohmann", "estado": "activo" }
    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody Galpon galpon) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(galponService.crear(galpon));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", e.getMessage()));
        }
    }

    // PUT /api/galpones/1
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @Valid @RequestBody Galpon galpon) {
        try {
            return ResponseEntity.ok(galponService.actualizar(id, galpon));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", e.getMessage()));
        }
    }

    // DELETE /api/galpones/1
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            galponService.eliminar(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", e.getMessage()));
        }
    }
}
