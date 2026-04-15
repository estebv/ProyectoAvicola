package com.lareina.avicola.repository;

import com.lareina.avicola.model.Galpon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface GalponRepository extends JpaRepository<Galpon, Long> {
    Optional<Galpon> findByNumeroGalpon(Integer numeroGalpon);
    boolean existsByNumeroGalpon(Integer numeroGalpon);
}
