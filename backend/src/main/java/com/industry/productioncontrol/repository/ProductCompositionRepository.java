package com.industry.productioncontrol.repository;

import com.industry.productioncontrol.model.ProductComposition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductCompositionRepository extends JpaRepository<ProductComposition, Long> {

    // get all raw materials that a product uses
    List<ProductComposition> findByProductId(Long productId);

    // get all products that use a specific raw material
    List<ProductComposition> findByRawMaterialId(Long rawMaterialId);

    // find a specific composition (product + raw material)
    Optional<ProductComposition> findByProductIdAndRawMaterialId(Long productId, Long rawMaterialId);

    // delete all compositions of a product
    void deleteByProductId(Long productId);

    // check if this combination of product and raw material already exists
    boolean existsByProductIdAndRawMaterialId(Long productId, Long rawMaterialId);

    // get compositions and bring complete data of product and raw material
    @Query("SELECT pc FROM ProductComposition pc " +
            "JOIN FETCH pc.product " +
            "JOIN FETCH pc.rawMaterial " +
            "WHERE pc.product.id = :productId")
    List<ProductComposition> findByProductIdWithDetails(@Param("productId") Long productId);
}