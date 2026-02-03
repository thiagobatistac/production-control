package com.industry.production_control.controller;

import com.industry.production_control.dto.request.RawMaterialRequestDTO;
import com.industry.production_control.dto.response.RawMaterialResponseDTO;
import com.industry.production_control.service.RawMaterialService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/raw-materials")
@CrossOrigin(origins = "*")
public class RawMaterialController {

    @Autowired
    private RawMaterialService rawMaterialService;

    // get all raw materials
    @GetMapping
    public ResponseEntity<List<RawMaterialResponseDTO>> getAllRawMaterials() {
        List<RawMaterialResponseDTO> rawMaterials = rawMaterialService.findAll();
        return ResponseEntity.ok(rawMaterials);
    }

    // get raw material by id
    @GetMapping("/{id}")
    public ResponseEntity<RawMaterialResponseDTO> getRawMaterialById(@PathVariable Long id) {
        RawMaterialResponseDTO rawMaterial = rawMaterialService.findById(id);
        return ResponseEntity.ok(rawMaterial);
    }

    // create new raw material
    @PostMapping
    public ResponseEntity<RawMaterialResponseDTO> createRawMaterial(@Valid @RequestBody RawMaterialRequestDTO request) {
        RawMaterialResponseDTO rawMaterial = rawMaterialService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(rawMaterial);
    }

    // update raw material
    @PutMapping("/{id}")
    public ResponseEntity<RawMaterialResponseDTO> updateRawMaterial(
            @PathVariable Long id,
            @Valid @RequestBody RawMaterialRequestDTO request) {
        RawMaterialResponseDTO rawMaterial = rawMaterialService.update(id, request);
        return ResponseEntity.ok(rawMaterial);
    }

    // delete raw material
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRawMaterial(@PathVariable Long id) {
        rawMaterialService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // search raw materials by name
    @GetMapping("/search")
    public ResponseEntity<List<RawMaterialResponseDTO>> searchRawMaterials(@RequestParam String name) {
        List<RawMaterialResponseDTO> rawMaterials = rawMaterialService.searchByName(name);
        return ResponseEntity.ok(rawMaterials);
    }

    // get raw materials with available stock
    @GetMapping("/in-stock")
    public ResponseEntity<List<RawMaterialResponseDTO>> getRawMaterialsInStock() {
        List<RawMaterialResponseDTO> rawMaterials = rawMaterialService.findAllWithStock();
        return ResponseEntity.ok(rawMaterials);
    }
}