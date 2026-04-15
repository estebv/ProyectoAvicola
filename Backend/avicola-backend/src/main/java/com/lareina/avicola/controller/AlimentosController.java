package com.lareina.avicola.controller;

import com.lareina.avicola.model.Alimentos;
import com.lareina.avicola.service.AlimentosService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/alimentos")
@RequiredArgsConstructor
public class AlimentosController {

    private final AlimentosService alimentosService;

    // GET /api/alimentos
    @GetMapping
    public ResponseEntity<List<Alimentos>> listarTodos() {
        return ResponseEntity.ok(alimentosService.listarTodos());
    }

    // GET /api/alimentos/galpon/1
    @GetMapping("/galpon/{idGalpon}")
    public ResponseEntity<List<Alimentos>> listarPorGalpon(@PathVariable Long idGalpon) {
        return ResponseEntity.ok(alimentosService.listarPorGalpon(idGalpon));
    }

    // GET /api/alimentos/fecha?fecha=2026-04-09
    @GetMapping("/fecha")
    public ResponseEntity<List<Alimentos>> listarPorFecha(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ResponseEntity.ok(alimentosService.listarPorFecha(fecha));
    }

    // GET /api/alimentos/1
    @GetMapping("/{id}")
    public ResponseEntity<Alimentos> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(alimentosService.buscarPorId(id));
    }

    // POST /api/alimentos?idGalpon=1
    @PostMapping
    public ResponseEntity<Alimentos> crear(@Valid @RequestBody Alimentos alimento,
                                           @RequestParam Long idGalpon) {
        return ResponseEntity.status(HttpStatus.CREATED).body(alimentosService.crear(alimento, idGalpon));
    }

    // PUT /api/alimentos/1?idGalpon=1
    @PutMapping("/{id}")
    public ResponseEntity<Alimentos> actualizar(@PathVariable Long id,
                                                @Valid @RequestBody Alimentos alimento,
                                                @RequestParam Long idGalpon) {
        return ResponseEntity.ok(alimentosService.actualizar(id, alimento, idGalpon));
    }

    // DELETE /api/alimentos/1
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        alimentosService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
