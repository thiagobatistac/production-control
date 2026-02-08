package com.industry.productioncontrol.controller;

import com.industry.productioncontrol.dto.request.ProductRequestDTO;
import com.industry.productioncontrol.dto.response.ProductResponseDTO;
import com.industry.productioncontrol.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
public class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProductService productService;

    @Test
    public void testGetAllProducts() throws Exception {
        // given
        ProductResponseDTO product1 = new ProductResponseDTO(1L, "Chair", new BigDecimal("150.00"));
        ProductResponseDTO product2 = new ProductResponseDTO(2L, "Table", new BigDecimal("300.00"));

        when(productService.findAll()).thenReturn(Arrays.asList(product1, product2));

        // when & then
        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Chair"))
                .andExpect(jsonPath("$[1].name").value("Table"));
    }

    @Test
    public void testCreateProduct() throws Exception {
        // given
        ProductRequestDTO request = new ProductRequestDTO("New Product", new BigDecimal("100.00"));
        ProductResponseDTO response = new ProductResponseDTO(1L, "New Product", new BigDecimal("100.00"));

        when(productService.create(any(ProductRequestDTO.class))).thenReturn(response);

        // when & then
        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("New Product"));
    }

    @Test
    public void testGetProductById() throws Exception {
        // given
        ProductResponseDTO product = new ProductResponseDTO(1L, "Chair", new BigDecimal("150.00"));

        when(productService.findById(1L)).thenReturn(product);

        // when & then
        mockMvc.perform(get("/api/products/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Chair"));
    }
}