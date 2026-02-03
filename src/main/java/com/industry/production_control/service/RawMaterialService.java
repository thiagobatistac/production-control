package com.industry.production_control.service;

import com.industry.production_control.dto.request.RawMaterialRequestDTO;
import com.industry.production_control.dto.response.RawMaterialResponseDTO;
import com.industry.production_control.exception.BusinessException;
import com.industry.production_control.exception.ResourceNotFoundException;
import com.industry.production_control.model.RawMaterial;
import com.industry.production_control.repository.RawMaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RawMaterialService {

    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    // get all raw materials
    public List<RawMaterialResponseDTO> findAll() {
        return rawMaterialRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // get raw material by id
    public RawMaterialResponseDTO findById(Long id) {
        RawMaterial rawMaterial = rawMaterialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Raw Material", id));
        return convertToResponseDTO(rawMaterial);
    }

    // create new raw material
    @Transactional
    public RawMaterialResponseDTO create(RawMaterialRequestDTO request) {
        // check if raw material name already exists
        if (rawMaterialRepository.existsByName(request.getName())) {
            throw new BusinessException("Raw material with name '" + request.getName() + "' already exists");
        }

        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setName(request.getName());
        rawMaterial.setStockQuantity(request.getStockQuantity());

        RawMaterial savedRawMaterial = rawMaterialRepository.save(rawMaterial);
        return convertToResponseDTO(savedRawMaterial);
    }

    // update raw material
    @Transactional
    public RawMaterialResponseDTO update(Long id, RawMaterialRequestDTO request) {
        RawMaterial rawMaterial = rawMaterialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Raw Material", id));

        // check if new name already exists in another raw material
        if (!rawMaterial.getName().equals(request.getName()) &&
                rawMaterialRepository.existsByName(request.getName())) {
            throw new BusinessException("Raw material with name '" + request.getName() + "' already exists");
        }

        rawMaterial.setName(request.getName());
        rawMaterial.setStockQuantity(request.getStockQuantity());

        RawMaterial updatedRawMaterial = rawMaterialRepository.save(rawMaterial);
        return convertToResponseDTO(updatedRawMaterial);
    }

    // delete raw material
    @Transactional
    public void delete(Long id) {
        if (!rawMaterialRepository.existsById(id)) {
            throw new ResourceNotFoundException("Raw Material", id);
        }
        rawMaterialRepository.deleteById(id);
    }

    // search raw materials by name
    public List<RawMaterialResponseDTO> searchByName(String name) {
        return rawMaterialRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // get raw materials with available stock
    public List<RawMaterialResponseDTO> findAllWithStock() {
        return rawMaterialRepository.findAllWithStock()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    // convert entity to dto
    private RawMaterialResponseDTO convertToResponseDTO(RawMaterial rawMaterial) {
        RawMaterialResponseDTO dto = new RawMaterialResponseDTO();
        dto.setId(rawMaterial.getId());
        dto.setName(rawMaterial.getName());
        dto.setStockQuantity(rawMaterial.getStockQuantity());
        return dto;
    }
}