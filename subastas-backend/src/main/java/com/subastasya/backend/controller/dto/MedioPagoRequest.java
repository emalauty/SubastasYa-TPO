package com.subastasya.backend.controller.dto;

import lombok.Data;

@Data
public class MedioPagoRequest {
    private String email;
    private String tipo;    // "TARJETA", "CUENTA_BANCARIA" o "CHEQUE"
    private String numero;
    private String titular;
}
