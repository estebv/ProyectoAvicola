package com.lareina.avicola.service;

import com.lareina.avicola.exception.RecursoNoEncontradoException;
import com.lareina.avicola.model.Galpon;
import com.lareina.avicola.model.Mortalidad;
import com.lareina.avicola.repository.MortalidadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
// Maneja regla de negocio de mortalidad y su impacto en galpones.
public class MortalidadService {

    private final MortalidadRepository mortalidadRepository;
    private final GalponService galponService;

    public List<Mortalidad> listarTodos() {
        return mortalidadRepository.findAll();
    }

    public List<Mortalidad> listarPorGalpon(Long idGalpon) {
        return mortalidadRepository.findByGalponId(idGalpon);
    }

    public List<Mortalidad> listarPorFecha(LocalDate fecha) {
        return mortalidadRepository.findByFechaMuerte(fecha);
    }

    public Mortalidad buscarPorId(Long id) {
        return mortalidadRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Registro de mortalidad no encontrado con id: " + id));
    }

    public Integer totalMuertesPorGalpon(Long idGalpon) {
        Integer total = mortalidadRepository.totalMuertesPorGalpon(idGalpon);
        return total != null ? total : 0;
    }

    @Transactional
    public Mortalidad crear(Mortalidad mortalidad, Long idGalpon) {
        // Vincula el registro al galpón existente.
        Galpon galpon = galponService.buscarPorId(idGalpon);
        mortalidad.setGalpon(galpon);
        Mortalidad guardada = mortalidadRepository.save(mortalidad);
        // Reducir automáticamente el conteo de aves en el galpón
        galponService.reducirAves(idGalpon, mortalidad.getNumeroAves());
        return guardada;
    }

    @Transactional
    public Mortalidad actualizar(Long id, Mortalidad datos, Long idGalpon) {
        Mortalidad mortalidad = buscarPorId(id);
        Galpon galpon = galponService.buscarPorId(idGalpon);
        mortalidad.setEstadoSalud(datos.getEstadoSalud());
        mortalidad.setFechaMuerte(datos.getFechaMuerte());
        mortalidad.setCausaMuerte(datos.getCausaMuerte());
        mortalidad.setNumeroAves(datos.getNumeroAves());
        mortalidad.setGalpon(galpon);
        return mortalidadRepository.save(mortalidad);
    }

    @Transactional
    public void eliminar(Long id) {
        buscarPorId(id);
        mortalidadRepository.deleteById(id);
    }
}
