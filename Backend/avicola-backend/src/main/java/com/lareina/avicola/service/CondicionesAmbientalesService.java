package com.lareina.avicola.service;

import com.lareina.avicola.exception.RecursoNoEncontradoException;
import com.lareina.avicola.model.CondicionesAmbientales;
import com.lareina.avicola.model.Galpon;
import com.lareina.avicola.repository.CondicionesAmbientalesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CondicionesAmbientalesService {

    private final CondicionesAmbientalesRepository condicionesRepository;
    private final GalponService galponService;

    public List<CondicionesAmbientales> listarTodos() {
        return condicionesRepository.findAll();
    }

    public List<CondicionesAmbientales> listarPorGalpon(Long idGalpon) {
        return condicionesRepository.findByGalponIdOrderByFechaDesc(idGalpon);
    }

    public List<CondicionesAmbientales> listarPorFecha(LocalDate fecha) {
        return condicionesRepository.findByFecha(fecha);
    }

    public CondicionesAmbientales buscarPorId(Long id) {
        return condicionesRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Condición ambiental no encontrada con id: " + id));
    }

    @Transactional
    public CondicionesAmbientales crear(CondicionesAmbientales condicion, Long idGalpon) {
        Galpon galpon = galponService.buscarPorId(idGalpon);
        condicion.setGalpon(galpon);
        return condicionesRepository.save(condicion);
    }

    @Transactional
    public CondicionesAmbientales actualizar(Long id, CondicionesAmbientales datos, Long idGalpon) {
        CondicionesAmbientales condicion = buscarPorId(id);
        Galpon galpon = galponService.buscarPorId(idGalpon);
        condicion.setFecha(datos.getFecha());
        condicion.setTemperatura(datos.getTemperatura());
        condicion.setHumedad(datos.getHumedad());
        condicion.setVentilacion(datos.getVentilacion());
        condicion.setIluminacion(datos.getIluminacion());
        condicion.setGalpon(galpon);
        return condicionesRepository.save(condicion);
    }

    @Transactional
    public void eliminar(Long id) {
        buscarPorId(id);
        condicionesRepository.deleteById(id);
    }
}
