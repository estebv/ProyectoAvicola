package com.avicola.service;

import com.avicola.model.Condiciones;
import com.avicola.model.Galpon;
import com.avicola.repository.CondicionesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CondicionesService {

    private final CondicionesRepository condicionesRepository;
    private final GalponService galponService;

    public List<Condiciones> listarTodos() {
        return condicionesRepository.findAll();
    }

    public Condiciones buscarPorId(Long id) {
        return condicionesRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Registro de condiciones no encontrado con ID: " + id));
    }

    public List<Condiciones> listarPorGalpon(Long idGalpon) {
        return condicionesRepository.findByGalponId(idGalpon);
    }

    public Condiciones crear(Condiciones condiciones, Long idGalpon) {
        Galpon galpon = galponService.buscarPorId(idGalpon);
        condiciones.setGalpon(galpon);
        return condicionesRepository.save(condiciones);
    }

    public Condiciones actualizar(Long id, Condiciones datos, Long idGalpon) {
        Condiciones condiciones = buscarPorId(id);
        Galpon galpon = galponService.buscarPorId(idGalpon);
        condiciones.setGalpon(galpon);
        condiciones.setFecha(datos.getFecha());
        condiciones.setTemperatura(datos.getTemperatura());
        condiciones.setHumedad(datos.getHumedad());
        condiciones.setVentilacion(datos.getVentilacion());
        condiciones.setIluminacion(datos.getIluminacion());
        return condicionesRepository.save(condiciones);
    }

    public void eliminar(Long id) {
        buscarPorId(id);
        condicionesRepository.deleteById(id);
    }
}
