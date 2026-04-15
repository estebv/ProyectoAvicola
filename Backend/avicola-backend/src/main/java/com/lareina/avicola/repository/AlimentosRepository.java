package com.lareina.avicola.repository;

import com.lareina.avicola.model.Alimentos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface AlimentosRepository extends JpaRepository<Alimentos, Long> {
    List<Alimentos> findByGalponId(Long idGalpon);
    List<Alimentos> findByFechaConsumo(LocalDate fecha);
}
