package com.industry.production_control.service;

import com.industry.production_control.dto.request.ProductCompositionRequestDTO;
import com.industry.production_control.dto.response.ProductCompositionResponseDTO;
import com.industry.production_control.exception.BusinessException;
import com.industry.production_control.exception.ResourceNotFoundException;
import com.industry.production_control.model.Product;
import com.industry.production_control.model.ProductComposition;
import com.industry.production_control.model.RawMaterial;
import com.industry.production_control.repository.ProductCompositionRepository;
import com.industry.production_control.repository.ProductRepository;
import com.industry.production_control.repository.RawMaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductCompositionService {

    @Autowired
    private ProductCompositionRepository compositionRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    // get all compositions of a product
    public List<ProductCompositionResponseDTO> findByProductId(Long productId) {
        // check if product exists
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product", productId);
        }

        return compositionRepository.findByProductIdWithDetails(productId)
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // create new composition (add raw material to product)
    @Transactional
    public ProductCompositionResponseDTO create(Long productId, ProductCompositionRequestDTO request) {
        // check if product exists
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", productId));

        // check if raw material exists
        RawMaterial rawMaterial = rawMaterialRepository.findById(request.getRawMaterialId())
                .orElseThrow(() -> new ResourceNotFoundException("Raw Material", request.getRawMaterialId()));

        // check if composition already exists
        if (compositionRepository.existsByProductIdAndRawMaterialId(productId, request.getRawMaterialId())) {
            throw new BusinessException("This raw material is already added to this product");
        }

        // validate quantity
        if (request.getQuantityRequired().doubleValue() <= 0) {
            throw new BusinessException("Quantity required must be greater than zero");
        }

        ProductComposition composition = new ProductComposition();
        composition.setProduct(product);
        composition.setRawMaterial(rawMaterial);
        composition.setQuantityRequired(request.getQuantityRequired());

        ProductComposition savedComposition = compositionRepository.save(composition);
        return convertToResponseDTO(savedComposition);
    }

    // update composition (change quantity required)
    @Transactional
    public ProductCompositionResponseDTO update(Long id, ProductCompositionRequestDTO request) {
        ProductComposition composition = compositionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Composition", id));

        // validate quantity
        if (request.getQuantityRequired().doubleValue() <= 0) {
            throw new BusinessException("Quantity required must be greater than zero");
        }

        composition.setQuantityRequired(request.getQuantityRequired());

        ProductComposition updatedComposition = compositionRepository.save(composition);
        return convertToResponseDTO(updatedComposition);
    }

    // delete composition
    @Transactional
    public void delete(Long id) {
        if (!compositionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Composition", id);
        }
        compositionRepository.deleteById(id);
    }

    // convert entity to dto
    private ProductCompositionResponseDTO convertToResponseDTO(ProductComposition composition) {
        ProductCompositionResponseDTO dto = new ProductCompositionResponseDTO();
        dto.setId(composition.getId());
        dto.setProductId(composition.getProduct().getId());
        dto.setProductName(composition.getProduct().getName());
        dto.setRawMaterialId(composition.getRawMaterial().getId());
        dto.setRawMaterialName(composition.getRawMaterial().getName());
        dto.setQuantityRequired(composition.getQuantityRequired());
        return dto;
    }
}