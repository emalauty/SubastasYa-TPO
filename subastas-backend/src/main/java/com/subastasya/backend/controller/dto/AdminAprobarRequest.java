package com.subastasya.backend.controller.dto;

import lombok.Data;

@Data
public class AdminAprobarRequest {
    private String email;
    private String categoria; // COMUN, ESPECIAL, PLATA, ORO, PLATINO
}
