package com.lareina.avicola.repository;

import com.lareina.avicola.model.Aves;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AvesRepository extends JpaRepository<Aves, Long> {
    List<Aves> findByGalponId(Long idGalpon);
}
