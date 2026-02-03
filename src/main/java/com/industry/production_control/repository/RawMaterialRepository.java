package com.industry.production_control.repository;

import com.industry.production_control.model.RawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RawMaterialRepository extends JpaRepository<RawMaterial, Long> {

    // search raw materials by name, case insensitive
    List<RawMaterial> findByNameContainingIgnoreCase(String name);

    // get only raw materials with available stock
    @Query("SELECT r FROM RawMaterial r WHERE r.stockQuantity > 0")
    List<RawMaterial> findAllWithStock();

    // check if a raw material with this name already exists
    boolean existsByName(String name);

    // find raw materials with stock below minimum (to warn it's running out)
    @Query("SELECT r FROM RawMaterial r WHERE r.stockQuantity < :minimumQuantity")
    List<RawMaterial> findLowStockItems(Double minimumQuantity);
}