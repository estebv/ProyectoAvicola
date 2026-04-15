package com.lareina.avicola.service;

import com.lareina.avicola.exception.RecursoNoEncontradoException;
import com.lareina.avicola.model.Alimentos;
import com.lareina.avicola.model.Galpon;
import com.lareina.avicola.repository.AlimentosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlimentosService {

    private final AlimentosRepository alimentosRepository;
    private final GalponService galponService;

    public List<Alimentos> listarTodos() {
        return alimentosRepository.findAll();
    }

    public List<Alimentos> listarPorGalpon(Long idGalpon) {
        return alimentosRepository.findByGalponId(idGalpon);
    }

    public List<Alimentos> listarPorFecha(LocalDate fecha) {
        return alimentosRepository.findByFechaConsumo(fecha);
    }

    public Alimentos buscarPorId(Long id) {
        return alimentosRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Registro de alimento no encontrado con id: " + id));
    }

    @Transactional
    public Alimentos crear(Alimentos alimento, Long idGalpon) {
        Galpon galpon = galponService.buscarPorId(idGalpon);
        alimento.setGalpon(galpon);
        return alimentosRepository.save(alimento);
    }

    @Transactional
    public Alimentos actualizar(Long id, Alimentos datos, Long idGalpon) {
        Alimentos alimento = buscarPorId(id);
        Galpon galpon = galponService.buscarPorId(idGalpon);
        alimento.setMarcaAlimento(datos.getMarcaAlimento());
        alimento.setEtapaAlimento(datos.getEtapaAlimento());
        alimento.setFechaConsumo(datos.getFechaConsumo());
        alimento.setCantidadKg(datos.getCantidadKg());
        alimento.setGalpon(galpon);
        return alimentosRepository.save(alimento);
    }

    @Transactional
    public void eliminar(Long id) {
        buscarPorId(id);
        alimentosRepository.deleteById(id);
    }
}
