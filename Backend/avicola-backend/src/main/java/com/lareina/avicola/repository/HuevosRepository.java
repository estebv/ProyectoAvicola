package com.lareina.avicola.repository;

import com.lareina.avicola.model.Huevos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface HuevosRepository extends JpaRepository<Huevos, Long> {
    List<Huevos> findByGalponId(Long idGalpon);
    List<Huevos> findByFechaPuesta(LocalDate fecha);
    List<Huevos> findByGalponIdAndFechaPuesta(Long idGalpon, LocalDate fecha);

    @Query("SELECT SUM(h.totalHuevo) FROM Huevos h WHERE h.fechaPuesta = :fecha")
    Long totalHuevosPorFecha(LocalDate fecha);
}
