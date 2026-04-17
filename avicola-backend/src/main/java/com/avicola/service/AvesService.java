package com.avicola.service;

import com.avicola.model.Aves;
import com.avicola.model.Galpon;
import com.avicola.repository.AvesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AvesService {

    private final AvesRepository avesRepository;
    private final GalponService galponService; // Para vincular el lote al galpón

    // Devuelve todos los lotes de aves
    public List<Aves> listarTodos() {
        return avesRepository.findAll();
    }

    // Busca un lote por ID
    public Aves buscarPorId(Long id) {
        return avesRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Lote de aves no encontrado con ID: " + id));
    }

    // Devuelve los lotes de un galpón específico
    public List<Aves> listarPorGalpon(Long idGalpon) {
        return avesRepository.findByGalponId(idGalpon);
    }

    // Registra un nuevo lote de aves y lo asocia al galpón
    public Aves crear(Aves aves, Long idGalpon) {
        Galpon galpon = galponService.buscarPorId(idGalpon);
        aves.setGalpon(galpon);
        return avesRepository.save(aves);
    }

    // Actualiza los datos de un lote
    public Aves actualizar(Long id, Aves datos, Long idGalpon) {
        Aves aves = buscarPorId(id);
        Galpon galpon = galponService.buscarPorId(idGalpon);
        aves.setGalpon(galpon);
        aves.setRaza(datos.getRaza());
        aves.setFechaNacimiento(datos.getFechaNacimiento());
        aves.setFechaLlegada(datos.getFechaLlegada());
        aves.setOrigen(datos.getOrigen());
        aves.setTotalAves(datos.getTotalAves());
        return avesRepository.save(aves);
    }

    // Elimina un lote
    public void eliminar(Long id) {
        buscarPorId(id);
        avesRepository.deleteById(id);
    }
}
