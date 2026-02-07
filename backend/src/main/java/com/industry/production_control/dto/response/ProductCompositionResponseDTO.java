package com.industry.production_control.dto.response;

import java.math.BigDecimal;

public class ProductCompositionResponseDTO {

    private Long id;
    private Long productId;
    private String productName;
    private Long rawMaterialId;
    private String rawMaterialName;
    private BigDecimal quantityRequired;

    // constructors
    public ProductCompositionResponseDTO() {
    }

    public ProductCompositionResponseDTO(Long id, Long productId, String productName,
                                         Long rawMaterialId, String rawMaterialName,
                                         BigDecimal quantityRequired) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.rawMaterialId = rawMaterialId;
        this.rawMaterialName = rawMaterialName;
        this.quantityRequired = quantityRequired;
    }

    // getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Long getRawMaterialId() {
        return rawMaterialId;
    }

    public void setRawMaterialId(Long rawMaterialId) {
        this.rawMaterialId = rawMaterialId;
    }

    public String getRawMaterialName() {
        return rawMaterialName;
    }

    public void setRawMaterialName(String rawMaterialName) {
        this.rawMaterialName = rawMaterialName;
    }

    public BigDecimal getQuantityRequired() {
        return quantityRequired;
    }

    public void setQuantityRequired(BigDecimal quantityRequired) {
        this.quantityRequired = quantityRequired;
    }
}