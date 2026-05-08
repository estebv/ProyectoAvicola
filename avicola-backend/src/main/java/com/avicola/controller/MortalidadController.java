package com.avicola.controller;

import com.avicola.model.Mortalidad;
import com.avicola.service.MortalidadService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

// ---------------------------------------------------------------
//  CONTROLADOR: MortalidadController
//
//  Endpoints:
//    GET    /api/mortalidad                    -> todos
//    GET    /api/mortalidad/{id}               -> uno por ID
//    GET    /api/mortalidad/galpon/{idGalpon}  -> de un galpón
//    POST   /api/mortalidad?idGalpon=1         -> crear (descuenta aves)
//    PUT    /api/mortalidad/{id}?idGalpon=1    -> actualizar
//    DELETE /api/mortalidad/{id}               -> eliminar
// ---------------------------------------------------------------
@RestController
@RequestMapping("/api/mortalidad")
public class MortalidadController {

    @Autowired
    private MortalidadService mortalidadService;

    @GetMapping
    public ResponseEntity<List<Mortalidad>> listarTodos() {
        return ResponseEntity.ok(mortalidadService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(mortalidadService.buscarPorId(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/galpon/{idGalpon}")
    public ResponseEntity<List<Mortalidad>> listarPorGalpon(@PathVariable Long idGalpon) {
        return ResponseEntity.ok(mortalidadService.listarPorGalpon(idGalpon));
    }

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody Mortalidad mortalidad, @RequestParam Long idGalpon) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(mortalidadService.crear(mortalidad, idGalpon));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id,
                                        @Valid @RequestBody Mortalidad mortalidad,
                                        @RequestParam Long idGalpon) {
        try {
            return ResponseEntity.ok(mortalidadService.actualizar(id, mortalidad, idGalpon));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            mortalidadService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }
}
