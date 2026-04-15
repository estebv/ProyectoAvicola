package com.lareina.avicola.service;

import com.lareina.avicola.exception.RecursoNoEncontradoException;
import com.lareina.avicola.model.Galpon;
import com.lareina.avicola.model.Huevos;
import com.lareina.avicola.repository.HuevosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HuevosService {

    private final HuevosRepository huevosRepository;
    private final GalponService galponService;

    public List<Huevos> listarTodos() {
        return huevosRepository.findAll();
    }

    public List<Huevos> listarPorGalpon(Long idGalpon) {
        return huevosRepository.findByGalponId(idGalpon);
    }

    public List<Huevos> listarPorFecha(LocalDate fecha) {
        return huevosRepository.findByFechaPuesta(fecha);
    }

    public Huevos buscarPorId(Long id) {
        return huevosRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Registro de huevos no encontrado con id: " + id));
    }

    public Long totalHuevosPorFecha(LocalDate fecha) {
        Long total = huevosRepository.totalHuevosPorFecha(fecha);
        return total != null ? total : 0L;
    }

    @Transactional
    public Huevos crear(Huevos huevos, Long idGalpon) {
        Galpon galpon = galponService.buscarPorId(idGalpon);
        huevos.setGalpon(galpon);
        return huevosRepository.save(huevos);
    }

    @Transactional
    public Huevos actualizar(Long id, Huevos datos, Long idGalpon) {
        Huevos huevos = buscarPorId(id);
        Galpon galpon = galponService.buscarPorId(idGalpon);
        huevos.setFechaPuesta(datos.getFechaPuesta());
        huevos.setPesoHuevo(datos.getPesoHuevo());
        huevos.setCalidadHuevo(datos.getCalidadHuevo());
        huevos.setTotalHuevo(datos.getTotalHuevo());
        huevos.setGalpon(galpon);
        return huevosRepository.save(huevos);
    }

    @Transactional
    public void eliminar(Long id) {
        buscarPorId(id);
        huevosRepository.deleteById(id);
    }
}
