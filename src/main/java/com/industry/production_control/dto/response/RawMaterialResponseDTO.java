package com.industry.production_control.dto.response;

import java.math.BigDecimal;

public class RawMaterialResponseDTO {

    private Long id;
    private String name;
    private BigDecimal stockQuantity;

    // constructors
    public RawMaterialResponseDTO() {
    }

    public RawMaterialResponseDTO(Long id, String name, BigDecimal stockQuantity) {
        this.id = id;
        this.name = name;
        this.stockQuantity = stockQuantity;
    }

    // getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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