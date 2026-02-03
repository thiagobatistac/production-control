package com.industry.production_control.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class ProductCompositionRequestDTO {

    @NotNull(message = "raw material id is required")
    private Long rawMaterialId;

    @NotNull(message = "quantity required is required")
    @DecimalMin(value = "0.01", message = "quantity required must be greater than zero")
    private BigDecimal quantityRequired;

    // constructors
    public ProductCompositionRequestDTO() {
    }

    public ProductCompositionRequestDTO(Long rawMaterialId, BigDecimal quantityRequired) {
        this.rawMaterialId = rawMaterialId;
        this.quantityRequired = quantityRequired;
    }

    // getters and setters
    public Long getRawMaterialId() {
        return rawMaterialId;
    }

    public void setRawMaterialId(Long rawMaterialId) {
        this.rawMaterialId = rawMaterialId;
    }

    public BigDecimal getQuantityRequired() {
        return quantityRequired;
    }

    public void setQuantityRequired(BigDecimal quantityRequired) {
        this.quantityRequired = quantityRequired;
    }
}