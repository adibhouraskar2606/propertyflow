package com.propertyflow.property.model;

public record Property(
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