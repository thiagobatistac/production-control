package com.industry.production_control.controller;

import com.industry.production_control.dto.request.ProductCompositionRequestDTO;
import com.industry.production_control.dto.response.ProductCompositionResponseDTO;
import com.industry.production_control.service.ProductCompositionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProductCompositionController {

    @Autowired
    private ProductCompositionService compositionService;

    // get all compositions of a product
    @GetMapping("/products/{productId}/compositions")
    public ResponseEntity<List<ProductCompositionResponseDTO>> getCompositionsByProduct(@PathVariable Long productId) {
        List<ProductCompositionResponseDTO> compositions = compositionService.findByProductId(productId);
        return ResponseEntity.ok(compositions);
    }

    // add raw material to product
    @PostMapping("/products/{productId}/compositions")
    public ResponseEntity<ProductCompositionResponseDTO> addComposition(
            @PathVariable Long productId,
            @Valid @RequestBody ProductCompositionRequestDTO request) {
        ProductCompositionResponseDTO composition = compositionService.create(productId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(composition);
    }

    // update composition (change quantity required)
    @PutMapping("/compositions/{id}")
    public ResponseEntity<ProductCompositionResponseDTO> updateComposition(
            @PathVariable Long id,
            @Valid @RequestBody ProductCompositionRequestDTO request) {
        ProductCompositionResponseDTO composition = compositionService.update(id, request);
        return ResponseEntity.ok(composition);
    }

    // delete composition
    @DeleteMapping("/compositions/{id}")
    public ResponseEntity<Void> deleteComposition(@PathVariable Long id) {
        compositionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}