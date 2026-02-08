package com.industry.productioncontrol.service;

import com.industry.productioncontrol.dto.request.ProductRequestDTO;
import com.industry.productioncontrol.dto.response.ProductResponseDTO;
import com.industry.productioncontrol.exception.BusinessException;
import com.industry.productioncontrol.exception.ResourceNotFoundException;
import com.industry.productioncontrol.model.Product;
import com.industry.productioncontrol.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // get all products
    public List<ProductResponseDTO> findAll() {
        return productRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // get product by id
    public ProductResponseDTO findById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));
        return convertToResponseDTO(product);
    }

    // create new product
    @Transactional
    public ProductResponseDTO create(ProductRequestDTO request) {
        // check if product name already exists
        if (productRepository.existsByName(request.getName())) {
            throw new BusinessException("Product with name '" + request.getName() + "' already exists");
        }

        Product product = new Product();
        product.setName(request.getName());
        product.setPrice(request.getPrice());

        Product savedProduct = productRepository.save(product);
        return convertToResponseDTO(savedProduct);
    }

    // update product
    @Transactional
    public ProductResponseDTO update(Long id, ProductRequestDTO request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));

        // check if new name already exists in another product
        if (!product.getName().equals(request.getName()) &&
                productRepository.existsByName(request.getName())) {
            throw new BusinessException("Product with name '" + request.getName() + "' already exists");
        }

        product.setName(request.getName());
        product.setPrice(request.getPrice());

        Product updatedProduct = productRepository.save(product);
        return convertToResponseDTO(updatedProduct);
    }

    // delete product
    @Transactional
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product", id);
        }
        productRepository.deleteById(id);
    }

    // search products by name
    public List<ProductResponseDTO> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // get all products ordered by value (for production suggestion)
    public List<Product> findAllOrderedByValue() {
        return productRepository.findAllByOrderByPriceDesc();
    }

    // convert entity to dto
    private ProductResponseDTO convertToResponseDTO(Product product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        return dto;
    }
}