package com.industry.productioncontrol.service;

import com.industry.productioncontrol.dto.request.ProductRequestDTO;
import com.industry.productioncontrol.dto.response.ProductResponseDTO;
import com.industry.productioncontrol.exception.BusinessException;
import com.industry.productioncontrol.exception.ResourceNotFoundException;
import com.industry.productioncontrol.model.Product;
import com.industry.productioncontrol.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    public void testFindAll() {
        // given
        Product product1 = new Product("Chair", new BigDecimal("150.00"));
        product1.setId(1L);
        Product product2 = new Product("Table", new BigDecimal("300.00"));
        product2.setId(2L);

        when(productRepository.findAll()).thenReturn(Arrays.asList(product1, product2));

        // when
        List<ProductResponseDTO> results = productService.findAll();

        // then
        assertThat(results).hasSize(2);
        assertThat(results.get(0).getName()).isEqualTo("Chair");
        verify(productRepository, times(1)).findAll();
    }

    @Test
    public void testFindById_Success() {
        // given
        Product product = new Product("Chair", new BigDecimal("150.00"));
        product.setId(1L);

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        // when
        ProductResponseDTO result = productService.findById(1L);

        // then
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getName()).isEqualTo("Chair");
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    public void testFindById_NotFound() {
        // given
        when(productRepository.findById(999L)).thenReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> productService.findById(999L))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    public void testCreate_Success() {
        // given
        ProductRequestDTO request = new ProductRequestDTO("New Product", new BigDecimal("100.00"));
        Product savedProduct = new Product("New Product", new BigDecimal("100.00"));
        savedProduct.setId(1L);

        when(productRepository.existsByName(anyString())).thenReturn(false);
        when(productRepository.save(any(Product.class))).thenReturn(savedProduct);

        // when
        ProductResponseDTO result = productService.create(request);

        // then
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getName()).isEqualTo("New Product");
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    public void testCreate_DuplicateName() {
        // given
        ProductRequestDTO request = new ProductRequestDTO("Existing Product", new BigDecimal("100.00"));

        when(productRepository.existsByName("Existing Product")).thenReturn(true);

        // when & then
        assertThatThrownBy(() -> productService.create(request))
                .isInstanceOf(BusinessException.class)
                .hasMessageContaining("already exists");
    }

    @Test
    public void testDelete_Success() {
        // given
        when(productRepository.existsById(1L)).thenReturn(true);

        // when
        productService.delete(1L);

        // then
        verify(productRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testDelete_NotFound() {
        // given
        when(productRepository.existsById(999L)).thenReturn(false);

        // when & then
        assertThatThrownBy(() -> productService.delete(999L))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}