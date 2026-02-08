package com.industry.productioncontrol.controller;

import com.industry.productioncontrol.dto.response.ProductionSuggestionResponseDTO;
import com.industry.productioncontrol.service.ProductionSuggestionService;
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