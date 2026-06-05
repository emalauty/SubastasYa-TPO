package com.subastasya.backend.repository;

import com.subastasya.backend.model.MedioDePago;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedioDePagoRepository extends JpaRepository<MedioDePago, Long> {
    List<MedioDePago> findByCliente_Identificador(Long clienteId);
}
