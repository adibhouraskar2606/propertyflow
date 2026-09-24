package com.propertyflow.property.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.propertyflow.property.model.Property;

@Service
public class PropertyService {
    public List<Property> getProperties() {
        return List.of(
                new Property(
                        1L,
                        "Mountain View Townhomes",
                        "1250 Harrison Blvd",
                        "Ogden",
                        "UT",
                        "84403",
                        3,
                        3),
                new Property(
                        2L,
                        "Downtown Apartments",
                        "245 Washington Blvd",
                        "Ogden",
                        "UT",
                        "84401",
                        8,
                        6),
                new Property(
                        3L,
                        "Canyon Ridge Apartments",
                        "780 Canyon Road",
                        "Ogden",
                        "UT",
                        "84404",
                        6,
                        4));
    }

    public Property getPropertyById(Long id) {
        return getProperties()
                .stream()
                .filter(property -> property.id().equals(id))
                .findFirst()
                .orElse(null);
    }
}