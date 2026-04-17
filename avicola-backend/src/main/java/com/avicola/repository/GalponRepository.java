package com.avicola.repository;

import com.avicola.model.Galpon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalponRepository extends JpaRepository<Galpon, Long> {

    // Verifica si ya existe un galpón con ese número → evitar duplicados
    boolean existsByNumero(Integer numero);
}
