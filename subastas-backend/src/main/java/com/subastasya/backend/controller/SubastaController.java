package com.subastasya.backend.controller;

import com.subastasya.backend.model.Subasta;
import com.subastasya.backend.repository.SubastaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/subastas")
@RequiredArgsConstructor
public class SubastaController {

    private final SubastaRepository subastaRepository;

    @GetMapping
    public ResponseEntity<List<Subasta>> getSubastas() {
        return ResponseEntity.ok(subastaRepository.findAll());
    }
}
