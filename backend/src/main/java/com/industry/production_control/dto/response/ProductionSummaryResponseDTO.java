package com.industry.production_control.dto.response;

import java.math.BigDecimal;

public class ProductionSummaryResponseDTO {

    private Long productId;
    private String productName;
    private BigDecimal productValue;
    private Integer quantity;
    private BigDecimal totalValue;

    // constructors
    public ProductionSummaryResponseDTO() {
    }

    public ProductionSummaryResponseDTO(Long productId, String productName, BigDecimal productValue,
                                        Integer quantity, BigDecimal totalValue) {
        this.productId = productId;
        this.productName = productName;
        this.productValue = productValue;
        this.quantity = quantity;
        this.totalValue = totalValue;
    }

    // getters and setters
    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public BigDecimal getProductValue() {
        return productValue;
    }

    public void setProductValue(BigDecimal productValue) {
        this.productValue = productValue;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(BigDecimal totalValue) {
        this.totalValue = totalValue;
    }
}