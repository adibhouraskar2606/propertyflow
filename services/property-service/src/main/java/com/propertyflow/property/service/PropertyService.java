package com.propertyflow.property.service;

import com.propertyflow.property.dto.CreatePropertyRequest;
import com.propertyflow.property.dto.PropertyResponse;
import com.propertyflow.property.dto.UpdatePropertyRequest;
import com.propertyflow.property.exception.InvalidPropertyException;
import com.propertyflow.property.exception.PropertyNotFoundException;
import com.propertyflow.property.model.Property;
import com.propertyflow.property.repository.PropertyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyService(
            PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    @Transactional(readOnly = true)
    public List<PropertyResponse> getProperties() {
        return propertyRepository
                .findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public PropertyResponse getPropertyById(Long id) {
        Property property = findProperty(id);

        return toResponse(property);
    }

    @Transactional
    public PropertyResponse createProperty(
            CreatePropertyRequest request) {
        validateOccupancy(
                request.units(),
                request.occupiedUnits());

        Property property = new Property(
                request.name().trim(),
                request.address().trim(),
                request.city().trim(),
                request.state().trim().toUpperCase(),
                request.zipCode().trim(),
                request.units(),
                request.occupiedUnits());

        Property savedProperty = propertyRepository.save(property);

        return toResponse(savedProperty);
    }

    @Transactional
    public PropertyResponse updateProperty(
            Long id,
            UpdatePropertyRequest request) {
        validateOccupancy(
                request.units(),
                request.occupiedUnits());

        Property property = findProperty(id);

        property.update(
                request.name().trim(),
                request.address().trim(),
                request.city().trim(),
                request.state().trim().toUpperCase(),
                request.zipCode().trim(),
                request.units(),
                request.occupiedUnits());

        return toResponse(property);
    }

    @Transactional
    public void deleteProperty(Long id) {
        Property property = findProperty(id);

        propertyRepository.delete(property);
    }

    private Property findProperty(Long id) {
        return propertyRepository
                .findById(id)
                .orElseThrow(
                        () -> new PropertyNotFoundException(id));
    }

    private void validateOccupancy(
            int units,
            int occupiedUnits) {
        if (occupiedUnits > units) {
            throw new InvalidPropertyException(
                    "Occupied units cannot exceed total units");
        }
    }

    private PropertyResponse toResponse(
            Property property) {
        return new PropertyResponse(
                property.getId(),
                property.getName(),
                property.getAddress(),
                property.getCity(),
                property.getState(),
                property.getZipCode(),
                property.getUnits(),
                property.getOccupiedUnits());
    }
}