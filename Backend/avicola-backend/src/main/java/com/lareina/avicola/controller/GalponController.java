package com.lareina.avicola.controller;

import com.lareina.avicola.model.Galpon;
import com.lareina.avicola.service.GalponService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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
    public ResponseEntity<Galpon> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(galponService.buscarPorId(id));
    }

    // POST /api/galpones
    @PostMapping
    public ResponseEntity<Galpon> crear(@Valid @RequestBody Galpon galpon) {
        return ResponseEntity.status(HttpStatus.CREATED).body(galponService.crear(galpon));
    }

    // PUT /api/galpones/1
    @PutMapping("/{id}")
    public ResponseEntity<Galpon> actualizar(@PathVariable Long id,
                                             @Valid @RequestBody Galpon galpon) {
        return ResponseEntity.ok(galponService.actualizar(id, galpon));
    }

    // DELETE /api/galpones/1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        galponService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
