package com.avicola.service;

import com.avicola.model.Galpon;
import com.avicola.repository.GalponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

// ─────────────────────────────────────────────────────────────────
//  SERVICIO: GalponService
//
//  Contiene toda la lógica de negocio de los galpones.
//  El controller llama a este servicio; este servicio llama
//  al repositorio para hablar con la base de datos.
//
//  Flujo: Controller → Service → Repository → Base de Datos
// ─────────────────────────────────────────────────────────────────
@Service
@RequiredArgsConstructor
public class GalponService {

    private final GalponRepository galponRepository;

    // Devuelve todos los galpones
    public List<Galpon> listarTodos() {
        return galponRepository.findAll();
    }

    // Busca un galpón por su ID. Si no existe, lanza error.
    public Galpon buscarPorId(Long id) {
        return galponRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Galpón no encontrado con ID: " + id));
    }

    // Crea un galpón nuevo. Verifica que el número no esté repetido.
    public Galpon crear(Galpon galpon) {
        if (galponRepository.existsByNumero(galpon.getNumero())) {
            throw new RuntimeException("Ya existe un galpón con el número: " + galpon.getNumero());
        }
        return galponRepository.save(galpon);
    }

    // Actualiza los datos de un galpón existente
    public Galpon actualizar(Long id, Galpon datos) {
        Galpon galpon = buscarPorId(id);
        galpon.setNumero(datos.getNumero());
        galpon.setNumeroAves(datos.getNumeroAves());
        galpon.setRaza(datos.getRaza());
        galpon.setEstado(datos.getEstado());
        return galponRepository.save(galpon);
    }

    // Elimina un galpón por su ID
    public void eliminar(Long id) {
        buscarPorId(id); // Verifica que existe antes de eliminar
        galponRepository.deleteById(id);
    }

    // Descuenta aves del galpón cuando se registra mortalidad
    public void reducirAves(Long id, int cantidad) {
        Galpon galpon = buscarPorId(id);
        int nuevo = Math.max(0, galpon.getNumeroAves() - cantidad); // No puede ser negativo
        galpon.setNumeroAves(nuevo);
        galponRepository.save(galpon);
    }
}
