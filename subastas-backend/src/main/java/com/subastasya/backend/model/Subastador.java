package com.subastasya.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "subastadores")
@PrimaryKeyJoinColumn(name = "identificador")
@Data
@EqualsAndHashCode(callSuper = true)
public class Subastador extends Persona {
    @Column(length = 15)
    private String matricula;

    @Column(length = 50)
    private String region;
}
