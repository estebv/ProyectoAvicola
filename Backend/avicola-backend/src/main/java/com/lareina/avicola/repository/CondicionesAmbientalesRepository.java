package com.lareina.avicola.repository;

import com.lareina.avicola.model.CondicionesAmbientales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface CondicionesAmbientalesRepository extends JpaRepository<CondicionesAmbientales, Long> {
    List<CondicionesAmbientales> findByGalponId(Long idGalpon);
    List<CondicionesAmbientales> findByFecha(LocalDate fecha);
    List<CondicionesAmbientales> findByGalponIdOrderByFechaDesc(Long idGalpon);
}
