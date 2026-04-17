package com.avicola.repository;

import com.avicola.model.Huevos;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HuevosRepository extends JpaRepository<Huevos, Long> {

    // Obtiene todos los registros de huevos de un galpón
    List<Huevos> findByGalponId(Long idGalpon);
}
