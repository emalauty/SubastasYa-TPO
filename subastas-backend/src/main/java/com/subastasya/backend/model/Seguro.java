package com.subastasya.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "seguros")
@Data
public class Seguro {
    @Id
    @Column(name = "nroPoliza", length = 30)
    private String nroPoliza;

    @Column(nullable = false, length = 150)
    private String compania;

    @Column(length = 2)
    private String polizaCombinada;

    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal importe;
}
