package com.avicola.repository;

import com.avicola.model.Alimentos;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AlimentosRepository extends JpaRepository<Alimentos, Long> {

    // Obtiene todos los registros de alimentos de un galpón
    List<Alimentos> findByGalponId(Long idGalpon);
}
