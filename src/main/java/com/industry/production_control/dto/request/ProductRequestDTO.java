package com.industry.production_control.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class ProductRequestDTO {

    @NotBlank(message = "product name is required")
    private String name;

    @NotNull(message = "product value is required")
    @DecimalMin(value = "0.01", message = "product value must be greater than zero")
    private BigDecimal value;

    // constructors
    public ProductRequestDTO() {
    }

    public ProductRequestDTO(String name, BigDecimal value) {
        this.name = name;
        this.value = value;
    }

    // getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }
}