package com.lareina.avicola.controller;

import com.lareina.avicola.model.Aves;
import com.lareina.avicola.service.AvesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/aves")
@RequiredArgsConstructor
public class AvesController {

    private final AvesService avesService;

    // GET /api/aves
    @GetMapping
    public ResponseEntity<List<Aves>> listarTodos() {
        return ResponseEntity.ok(avesService.listarTodos());
    }

    // GET /api/aves/galpon/1
    @GetMapping("/galpon/{idGalpon}")
    public ResponseEntity<List<Aves>> listarPorGalpon(@PathVariable Long idGalpon) {
        return ResponseEntity.ok(avesService.listarPorGalpon(idGalpon));
    }

    // GET /api/aves/1
    @GetMapping("/{id}")
    public ResponseEntity<Aves> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(avesService.buscarPorId(id));
    }

    // POST /api/aves?idGalpon=1
    @PostMapping
    public ResponseEntity<Aves> crear(@Valid @RequestBody Aves aves,
                                      @RequestParam Long idGalpon) {
        return ResponseEntity.status(HttpStatus.CREATED).body(avesService.crear(aves, idGalpon));
    }

    // PUT /api/aves/1?idGalpon=1
    @PutMapping("/{id}")
    public ResponseEntity<Aves> actualizar(@PathVariable Long id,
                                           @Valid @RequestBody Aves aves,
                                           @RequestParam Long idGalpon) {
        return ResponseEntity.ok(avesService.actualizar(id, aves, idGalpon));
    }

    // DELETE /api/aves/1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        avesService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
