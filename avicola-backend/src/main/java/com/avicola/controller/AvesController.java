package com.avicola.controller;

import com.avicola.model.Aves;
import com.avicola.service.AvesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

// ─────────────────────────────────────────────────────────────────
//  CONTROLADOR: AvesController
//
//  Endpoints:
//    GET    /api/aves                     → todos los lotes
//    GET    /api/aves/{id}                → un lote por ID
//    GET    /api/aves/galpon/{idGalpon}   → lotes de un galpón
//    POST   /api/aves?idGalpon=1          → crear lote
//    PUT    /api/aves/{id}?idGalpon=1     → actualizar
//    DELETE /api/aves/{id}                → eliminar
// ─────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api/aves")
@RequiredArgsConstructor
public class AvesController {

    private final AvesService avesService;

    @GetMapping
    public ResponseEntity<List<Aves>> listarTodos() {
        return ResponseEntity.ok(avesService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(avesService.buscarPorId(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/galpon/{idGalpon}")
    public ResponseEntity<List<Aves>> listarPorGalpon(@PathVariable Long idGalpon) {
        return ResponseEntity.ok(avesService.listarPorGalpon(idGalpon));
    }

    // POST /api/aves?idGalpon=1
    // Body: { "raza": "Lohmann", "fecha_nacimiento": "2023-06-01",
    //         "fecha_llegada": "2023-06-15", "origen": "Proveedor local", "total_aves": 4200 }
    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody Aves aves, @RequestParam Long idGalpon) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(avesService.crear(aves, idGalpon));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id,
                                        @Valid @RequestBody Aves aves,
                                        @RequestParam Long idGalpon) {
        try {
            return ResponseEntity.ok(avesService.actualizar(id, aves, idGalpon));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            avesService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }
}
