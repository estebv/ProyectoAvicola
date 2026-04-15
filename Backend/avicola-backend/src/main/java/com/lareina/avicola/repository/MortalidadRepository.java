package com.lareina.avicola.repository;

import com.lareina.avicola.model.Mortalidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface MortalidadRepository extends JpaRepository<Mortalidad, Long> {
    List<Mortalidad> findByGalponId(Long idGalpon);
    List<Mortalidad> findByFechaMuerte(LocalDate fecha);

    @Query("SELECT SUM(m.numeroAves) FROM Mortalidad m WHERE m.galpon.id = :idGalpon")
    Integer totalMuertesPorGalpon(Long idGalpon);
}
