package com.industry.production_control.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class RawMaterialRequestDTO {

    @NotBlank(message = "raw material name is required")
    private String name;

    @NotNull(message = "stock quantity is required")
    @DecimalMin(value = "0.0", message = "stock quantity cannot be negative")
    private BigDecimal stockQuantity;

    // constructors
    public RawMaterialRequestDTO() {
    }

    public RawMaterialRequestDTO(String name, BigDecimal stockQuantity) {
        this.name = name;
        this.stockQuantity = stockQuantity;
    }

    // getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(BigDecimal stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
}