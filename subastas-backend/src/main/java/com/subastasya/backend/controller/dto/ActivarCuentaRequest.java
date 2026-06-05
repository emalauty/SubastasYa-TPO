package com.subastasya.backend.controller.dto;

import lombok.Data;

@Data
public class ActivarCuentaRequest {
    private String token;
    private String password;
}
