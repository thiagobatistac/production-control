package com.industry.production_control.controller;

import com.industry.production_control.dto.response.ProductionSuggestionResponseDTO;
import com.industry.production_control.service.ProductionSuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/production")
@CrossOrigin(origins = "*")
public class ProductionSuggestionController {

    @Autowired
    private ProductionSuggestionService suggestionService;

    // get production suggestions based on available stock
    @GetMapping("/suggestions")
    public ResponseEntity<ProductionSuggestionResponseDTO> getProductionSuggestions() {
        ProductionSuggestionResponseDTO suggestions = suggestionService.calculateProductionSuggestions();
        return ResponseEntity.ok(suggestions);
    }
}