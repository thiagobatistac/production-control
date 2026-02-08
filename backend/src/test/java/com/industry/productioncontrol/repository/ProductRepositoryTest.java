package com.industry.productioncontrol.repository;

import com.industry.productioncontrol.model.Product;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class ProductRepositoryTest {

    @Autowired
    private ProductRepository productRepository;

    @Test
    public void testSaveProduct() {
        // given
        Product product = new Product("Test Product", new BigDecimal("100.00"));

        // when
        Product savedProduct = productRepository.save(product);

        // then
        assertThat(savedProduct.getId()).isNotNull();
        assertThat(savedProduct.getName()).isEqualTo("Test Product");
        assertThat(savedProduct.getPrice()).isEqualByComparingTo(new BigDecimal("100.00"));
    }

    @Test
    public void testFindByNameContainingIgnoreCase() {
        // given
        productRepository.save(new Product("Chair", new BigDecimal("150.00")));
        productRepository.save(new Product("Table", new BigDecimal("300.00")));

        // when
        List<Product> results = productRepository.findByNameContainingIgnoreCase("chair");

        // then
        assertThat(results).hasSize(1);
        assertThat(results.get(0).getName()).isEqualTo("Chair");
    }

    @Test
    public void testExistsByName() {
        // given
        productRepository.save(new Product("Lamp", new BigDecimal("50.00")));

        // when
        boolean exists = productRepository.existsByName("Lamp");
        boolean notExists = productRepository.existsByName("NonExistent");

        // then
        assertThat(exists).isTrue();
        assertThat(notExists).isFalse();
    }

    @Test
    public void testFindAllByOrderByValueDesc() {
        // given
        productRepository.save(new Product("Cheap", new BigDecimal("10.00")));
        productRepository.save(new Product("Expensive", new BigDecimal("1000.00")));
        productRepository.save(new Product("Medium", new BigDecimal("100.00")));

        // when
        List<Product> results = productRepository.findAllByOrderByPriceDesc();

        // then
        assertThat(results).hasSize(3);
        assertThat(results.get(0).getName()).isEqualTo("Expensive");
        assertThat(results.get(1).getName()).isEqualTo("Medium");
        assertThat(results.get(2).getName()).isEqualTo("Cheap");
    }
}