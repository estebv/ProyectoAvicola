package com.lareina.avicola.service;

import com.lareina.avicola.exception.RecursoNoEncontradoException;
import com.lareina.avicola.model.Galpon;
import com.lareina.avicola.repository.GalponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GalponService {

    private final GalponRepository galponRepository;

    public List<Galpon> listarTodos() {
        return galponRepository.findAll();
    }

    public Galpon buscarPorId(Long id) {
        return galponRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Galpón no encontrado con id: " + id));
    }

    @Transactional
    public Galpon crear(Galpon galpon) {
        if (galponRepository.existsByNumeroGalpon(galpon.getNumeroGalpon())) {
            throw new IllegalArgumentException("Ya existe un galpón con el número: " + galpon.getNumeroGalpon());
        }
        return galponRepository.save(galpon);
    }

    @Transactional
    public Galpon actualizar(Long id, Galpon datos) {
        Galpon galpon = buscarPorId(id);
        galpon.setNumeroGalpon(datos.getNumeroGalpon());
        galpon.setNumeroAves(datos.getNumeroAves());
        return galponRepository.save(galpon);
    }

    @Transactional
    public void eliminar(Long id) {
        buscarPorId(id);
        galponRepository.deleteById(id);
    }

    @Transactional
    public Galpon reducirAves(Long idGalpon, int cantidad) {
        Galpon galpon = buscarPorId(idGalpon);
        int nuevo = Math.max(0, galpon.getNumeroAves() - cantidad);
        galpon.setNumeroAves(nuevo);
        return galponRepository.save(galpon);
    }
}
