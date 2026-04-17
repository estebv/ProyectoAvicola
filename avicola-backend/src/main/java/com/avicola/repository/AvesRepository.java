package com.avicola.repository;

import com.avicola.model.Aves;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AvesRepository extends JpaRepository<Aves, Long> {

    // Obtiene todos los lotes de aves de un galpón
    // Spring JPA traduce "findByGalponId" a: WHERE id_galpon = ?
    List<Aves> findByGalponId(Long idGalpon);
}
