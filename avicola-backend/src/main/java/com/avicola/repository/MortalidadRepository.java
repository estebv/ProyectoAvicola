package com.avicola.repository;

import com.avicola.model.Mortalidad;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MortalidadRepository extends JpaRepository<Mortalidad, Long> {

    // Obtiene todos los registros de mortalidad de un galpón
    List<Mortalidad> findByGalponId(Long idGalpon);
}
