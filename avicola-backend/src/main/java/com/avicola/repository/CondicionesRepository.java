package com.avicola.repository;

import com.avicola.model.Condiciones;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CondicionesRepository extends JpaRepository<Condiciones, Long> {

    // Obtiene todos los registros ambientales de un galpón
    List<Condiciones> findByGalponId(Long idGalpon);
}
