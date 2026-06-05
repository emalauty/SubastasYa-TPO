package com.subastasya.backend.controller.dto;

import lombok.Data;

@Data
public class AdminRechazarRequest {
    private String email;
    private String razon;
}
