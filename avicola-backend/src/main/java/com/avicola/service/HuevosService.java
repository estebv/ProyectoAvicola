package com.avicola.service;

import com.avicola.model.Huevos;
import com.avicola.model.Galpon;
import com.avicola.repository.HuevosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HuevosService {

    private final HuevosRepository huevosRepository;
    private final GalponService galponService;

    // Devuelve todos los registros de huevos
    public List<Huevos> listarTodos() {
        return huevosRepository.findAll();
    }

    // Busca un registro por ID
    public Huevos buscarPorId(Long id) {
        return huevosRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Registro de huevos no encontrado con ID: " + id));
    }

    // Devuelve los registros de un galpón específico
    public List<Huevos> listarPorGalpon(Long idGalpon) {
        return huevosRepository.findByGalponId(idGalpon);
    }

    // Crea un nuevo registro de producción de huevos
    public Huevos crear(Huevos huevos, Long idGalpon) {
        Galpon galpon = galponService.buscarPorId(idGalpon);
        huevos.setGalpon(galpon);
        return huevosRepository.save(huevos);
    }

    // Actualiza un registro existente
    public Huevos actualizar(Long id, Huevos datos, Long idGalpon) {
        Huevos huevos = buscarPorId(id);
        Galpon galpon = galponService.buscarPorId(idGalpon);
        huevos.setGalpon(galpon);
        huevos.setFechaPuesta(datos.getFechaPuesta());
        huevos.setPesoHuevo(datos.getPesoHuevo());
        huevos.setCalidadHuevo(datos.getCalidadHuevo());
        huevos.setTotalHuevo(datos.getTotalHuevo());
        return huevosRepository.save(huevos);
    }

    // Elimina un registro
    public void eliminar(Long id) {
        buscarPorId(id);
        huevosRepository.deleteById(id);
    }
}
