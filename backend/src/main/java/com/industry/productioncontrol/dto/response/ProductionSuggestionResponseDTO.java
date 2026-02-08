package com.industry.productioncontrol.dto.response;

import java.math.BigDecimal;
import java.util.List;

public class ProductionSuggestionResponseDTO {

    private List<ProductionSummaryResponseDTO> suggestions;
    private BigDecimal totalValue;

    // constructors
    public ProductionSuggestionResponseDTO() {
    }

    public ProductionSuggestionResponseDTO(List<ProductionSummaryResponseDTO> suggestions, BigDecimal totalValue) {
        this.suggestions = suggestions;
        this.totalValue = totalValue;
    }

    // getters and setters
    public List<ProductionSummaryResponseDTO> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<ProductionSummaryResponseDTO> suggestions) {
        this.suggestions = suggestions;
    }

    public BigDecimal getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(BigDecimal totalValue) {
        this.totalValue = totalValue;
    }
}