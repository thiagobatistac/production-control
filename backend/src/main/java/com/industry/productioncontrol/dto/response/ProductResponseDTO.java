package com.industry.productioncontrol.dto.response;

import java.math.BigDecimal;

public class ProductResponseDTO {

    private Long id;
    private String name;
    private BigDecimal value;

    // constructors
    public ProductResponseDTO() {
    }

    public ProductResponseDTO(Long id, String name, BigDecimal value) {
        this.id = id;
        this.name = name;
        this.value = value;
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

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }
}