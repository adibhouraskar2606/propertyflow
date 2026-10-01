package com.propertyflow.property.dto;

public record PropertyResponse(
        Long id,
        String name,
        String address,
        String city,
        String state,
        String zipCode,
        int units,
        int occupiedUnits
) {
}