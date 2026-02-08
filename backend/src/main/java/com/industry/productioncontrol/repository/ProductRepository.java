package com.industry.productioncontrol.repository;

import com.industry.productioncontrol.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // search products by name, case insensitive
    List<Product> findByNameContainingIgnoreCase(String name);

    // get all products ordered from most expensive to cheapest
    List<Product> findAllByOrderByValueDesc();

    // check if a product with this name already exists
    boolean existsByName(String name);

    // get products and bring compositions together to avoid multiple queries
    @Query("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.compositions")
    List<Product> findAllWithCompositions();
}