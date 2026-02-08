package com.industry.productioncontrol.service;

import com.industry.productioncontrol.dto.response.ProductionSuggestionResponseDTO;
import com.industry.productioncontrol.dto.response.ProductionSummaryResponseDTO;
import com.industry.productioncontrol.model.Product;
import com.industry.productioncontrol.model.ProductComposition;
import com.industry.productioncontrol.repository.ProductRepository;
import com.industry.productioncontrol.repository.RawMaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class ProductionSuggestionService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    // calculate production suggestions based on available stock
    public ProductionSuggestionResponseDTO calculateProductionSuggestions() {
        // get all products ordered by value (most expensive first)
        List<Product> products = productRepository.findAllWithCompositions();
        products.sort((p1, p2) -> p2.getValue().compareTo(p1.getValue()));

        // get current stock of all raw materials
        Map<Long, BigDecimal> availableStock = new HashMap<>();
        rawMaterialRepository.findAll().forEach(rm ->
                availableStock.put(rm.getId(), rm.getStockQuantity())
        );

        List<ProductionSummaryResponseDTO> suggestions = new ArrayList<>();
        BigDecimal totalValue = BigDecimal.ZERO;

        // for each product, calculate how many can be produced
        for (Product product : products) {
            if (product.getCompositions().isEmpty()) {
                continue; // skip products without raw materials defined
            }

            // calculate maximum quantity that can be produced
            Integer maxQuantity = calculateMaxQuantity(product, availableStock);

            if (maxQuantity > 0) {
                // add to suggestions
                ProductionSummaryResponseDTO summary = new ProductionSummaryResponseDTO();
                summary.setProductId(product.getId());
                summary.setProductName(product.getName());
                summary.setProductValue(product.getValue());
                summary.setQuantity(maxQuantity);
                summary.setTotalValue(product.getValue().multiply(new BigDecimal(maxQuantity)));

                suggestions.add(summary);
                totalValue = totalValue.add(summary.getTotalValue());

                // update available stock after "producing" this product
                updateStock(product, maxQuantity, availableStock);
            }
        }

        // build response
        ProductionSuggestionResponseDTO response = new ProductionSuggestionResponseDTO();
        response.setSuggestions(suggestions);
        response.setTotalValue(totalValue);

        return response;
    }

    // calculate maximum quantity that can be produced for a product
    private Integer calculateMaxQuantity(Product product, Map<Long, BigDecimal> availableStock) {
        Integer maxQuantity = Integer.MAX_VALUE;

        for (ProductComposition composition : product.getCompositions()) {
            Long rawMaterialId = composition.getRawMaterial().getId();
            BigDecimal available = availableStock.getOrDefault(rawMaterialId, BigDecimal.ZERO);
            BigDecimal required = composition.getQuantityRequired();

            // calculate how many units can be made with this raw material
            int possibleQuantity = available.divide(required, 0, BigDecimal.ROUND_DOWN).intValue();

            // the limiting factor is the raw material with lowest possible quantity
            maxQuantity = Math.min(maxQuantity, possibleQuantity);
        }

        return maxQuantity == Integer.MAX_VALUE ? 0 : maxQuantity;
    }

    // update stock after calculating production
    private void updateStock(Product product, Integer quantity, Map<Long, BigDecimal> availableStock) {
        for (ProductComposition composition : product.getCompositions()) {
            Long rawMaterialId = composition.getRawMaterial().getId();
            BigDecimal currentStock = availableStock.get(rawMaterialId);
            BigDecimal toConsume = composition.getQuantityRequired().multiply(new BigDecimal(quantity));
            availableStock.put(rawMaterialId, currentStock.subtract(toConsume));
        }
    }
}