package com.subastasya.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "empleados")
@PrimaryKeyJoinColumn(name = "identificador")
@Data
@EqualsAndHashCode(callSuper = true)
public class Empleado extends Persona {
    @Column(length = 100)
    private String cargo;

    // Relacionado con sector int null en el script
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sector")
    private Sector sector;
}
