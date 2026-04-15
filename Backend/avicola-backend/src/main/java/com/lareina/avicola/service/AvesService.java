package com.lareina.avicola.service;

import com.lareina.avicola.exception.RecursoNoEncontradoException;
import com.lareina.avicola.model.Aves;
import com.lareina.avicola.model.Galpon;
import com.lareina.avicola.repository.AvesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AvesService {

    private final AvesRepository avesRepository;
    private final GalponService galponService;

    public List<Aves> listarTodos() {
        return avesRepository.findAll();
    }

    public List<Aves> listarPorGalpon(Long idGalpon) {
        return avesRepository.findByGalponId(idGalpon);
    }

    public Aves buscarPorId(Long id) {
        return avesRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Lote de aves no encontrado con id: " + id));
    }

    @Transactional
    public Aves crear(Aves aves, Long idGalpon) {
        Galpon galpon = galponService.buscarPorId(idGalpon);
        aves.setGalpon(galpon);
        return avesRepository.save(aves);
    }

    @Transactional
    public Aves actualizar(Long id, Aves datos, Long idGalpon) {
        Aves aves = buscarPorId(id);
        Galpon galpon = galponService.buscarPorId(idGalpon);
        aves.setRaza(datos.getRaza());
        aves.setFechaNacimiento(datos.getFechaNacimiento());
        aves.setFechaLlegada(datos.getFechaLlegada());
        aves.setOrigen(datos.getOrigen());
        aves.setTotalAves(datos.getTotalAves());
        aves.setGalpon(galpon);
        return avesRepository.save(aves);
    }

    @Transactional
    public void eliminar(Long id) {
        buscarPorId(id);
        avesRepository.deleteById(id);
    }
}
