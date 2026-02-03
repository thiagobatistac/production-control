package com.industry.production_control.exception;

public class InsufficientStockException extends RuntimeException {
    public InsufficientStockException(String message) {
        super(message);
    }

    public InsufficientStockException(String rawMaterialName, Double required, Double available) {
        super(String.format("Insufficient stock for %s. Required: %.2f, Available: %.2f",
                rawMaterialName, required, available));
    }
}
