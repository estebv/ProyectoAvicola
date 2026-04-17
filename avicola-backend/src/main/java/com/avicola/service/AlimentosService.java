package com.avicola.service;

import com.avicola.model.Alimentos;
import com.avicola.model.Galpon;
import com.avicola.repository.AlimentosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlimentosService {

    private final AlimentosRepository alimentosRepository;
    private final GalponService galponService;

    public List<Alimentos> listarTodos() {
        return alimentosRepository.findAll();
    }

    public Alimentos buscarPorId(Long id) {
        return alimentosRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Registro de alimentos no encontrado con ID: " + id));
    }

    public List<Alimentos> listarPorGalpon(Long idGalpon) {
        return alimentosRepository.findByGalponId(idGalpon);
    }

    public Alimentos crear(Alimentos alimentos, Long idGalpon) {
        Galpon galpon = galponService.buscarPorId(idGalpon);
        alimentos.setGalpon(galpon);
        return alimentosRepository.save(alimentos);
    }

    public Alimentos actualizar(Long id, Alimentos datos, Long idGalpon) {
        Alimentos alimentos = buscarPorId(id);
        Galpon galpon = galponService.buscarPorId(idGalpon);
        alimentos.setGalpon(galpon);
        alimentos.setMarcaAlimento(datos.getMarcaAlimento());
        alimentos.setEtapaAlimento(datos.getEtapaAlimento());
        alimentos.setFechaConsumo(datos.getFechaConsumo());
        alimentos.setCantidadKg(datos.getCantidadKg());
        return alimentosRepository.save(alimentos);
    }

    public void eliminar(Long id) {
        buscarPorId(id);
        alimentosRepository.deleteById(id);
    }
}
