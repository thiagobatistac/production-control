package com.industry.productioncontrol.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class ProductRequestDTO {

    @NotBlank(message = "product name is required")
    private String name;

    @NotNull(message = "product price is required")
    @DecimalMin(value = "0.01", message = "product price must be greater than zero")
    private BigDecimal price;

    // constructors
    public ProductRequestDTO() {
    }

    public ProductRequestDTO(String name, BigDecimal value) {
        this.name = name;
        this.price = value;
    }

    // getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}