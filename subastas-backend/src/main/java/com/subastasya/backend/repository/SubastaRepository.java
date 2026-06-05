package com.subastasya.backend.repository;

import com.subastasya.backend.model.Subasta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubastaRepository extends JpaRepository<Subasta, Long> {
}
