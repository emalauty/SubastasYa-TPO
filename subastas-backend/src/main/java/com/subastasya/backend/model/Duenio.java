package com.subastasya.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "duenios")
@PrimaryKeyJoinColumn(name = "identificador")
@Data
@EqualsAndHashCode(callSuper = true)
public class Duenio extends Persona {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "numeroPais")
    private Pais pais;

    @Column(length = 2)
    private String verificacionFinanciera;

    @Column(length = 2)
    private String verificacionJudicial;

    @Column
    private Integer calificacionRiesgo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "verificador")
    private Empleado verificador;
}
