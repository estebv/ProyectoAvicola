package com.avicola.controller;

import com.avicola.model.Alimentos;
import com.avicola.service.AlimentosService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

// ─────────────────────────────────────────────────────────────────
//  CONTROLADOR: AlimentosController
//
//  Endpoints:
//    GET    /api/alimentos                    → todos
//    GET    /api/alimentos/{id}               → uno por ID
//    GET    /api/alimentos/galpon/{idGalpon}  → de un galpón
//    POST   /api/alimentos?idGalpon=1         → crear
//    PUT    /api/alimentos/{id}?idGalpon=1    → actualizar
//    DELETE /api/alimentos/{id}               → eliminar
// ─────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api/alimentos")
public class AlimentosController {

    @Autowired
    private AlimentosService alimentosService;

    @GetMapping
    public ResponseEntity<List<Alimentos>> listarTodos() {
        return ResponseEntity.ok(alimentosService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(alimentosService.buscarPorId(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/galpon/{idGalpon}")
    public ResponseEntity<List<Alimentos>> listarPorGalpon(@PathVariable Long idGalpon) {
        return ResponseEntity.ok(alimentosService.listarPorGalpon(idGalpon));
    }

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody Alimentos alimentos, @RequestParam Long idGalpon) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(alimentosService.crear(alimentos, idGalpon));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id,
                                        @Valid @RequestBody Alimentos alimentos,
                                        @RequestParam Long idGalpon) {
        try {
            return ResponseEntity.ok(alimentosService.actualizar(id, alimentos, idGalpon));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            alimentosService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }
}
