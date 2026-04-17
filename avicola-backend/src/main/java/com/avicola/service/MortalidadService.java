package com.avicola.service;

import com.avicola.model.Mortalidad;
import com.avicola.model.Galpon;
import com.avicola.repository.MortalidadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MortalidadService {

    private final MortalidadRepository mortalidadRepository;
    private final GalponService galponService;

    public List<Mortalidad> listarTodos() {
        return mortalidadRepository.findAll();
    }

    public Mortalidad buscarPorId(Long id) {
        return mortalidadRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Registro de mortalidad no encontrado con ID: " + id));
    }

    public List<Mortalidad> listarPorGalpon(Long idGalpon) {
        return mortalidadRepository.findByGalponId(idGalpon);
    }

    // @Transactional garantiza que ambas operaciones (guardar mortalidad
    // Y reducir aves del galpón) se hacen juntas. Si una falla, la otra
    // también se revierte automáticamente.
    @Transactional
    public Mortalidad crear(Mortalidad mortalidad, Long idGalpon) {
        Galpon galpon = galponService.buscarPorId(idGalpon);
        mortalidad.setGalpon(galpon);

        // Guardar el registro de mortalidad
        Mortalidad guardado = mortalidadRepository.save(mortalidad);

        // Descontar las aves muertas del galpón
        galponService.reducirAves(idGalpon, mortalidad.getNumeroAves());

        return guardado;
    }

    public Mortalidad actualizar(Long id, Mortalidad datos, Long idGalpon) {
        Mortalidad mortalidad = buscarPorId(id);
        Galpon galpon = galponService.buscarPorId(idGalpon);
        mortalidad.setGalpon(galpon);
        mortalidad.setFechaMuerte(datos.getFechaMuerte());
        mortalidad.setCausaMuerte(datos.getCausaMuerte());
        mortalidad.setNumeroAves(datos.getNumeroAves());
        mortalidad.setEstadoSalud(datos.getEstadoSalud());
        return mortalidadRepository.save(mortalidad);
    }

    public void eliminar(Long id) {
        buscarPorId(id);
        mortalidadRepository.deleteById(id);
    }
}
