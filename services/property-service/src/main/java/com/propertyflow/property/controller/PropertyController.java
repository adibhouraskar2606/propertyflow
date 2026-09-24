package com.propertyflow.property.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import com.propertyflow.property.model.Property;
import com.propertyflow.property.service.PropertyService;

@RestController
@RequestMapping("api/properties")
public class PropertyController {
    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public List<Property> getProperties() {
        return propertyService.getProperties();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(
            @PathVariable Long id) {
        Property property = propertyService.getPropertyById(id);

        if (property == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(property);
    }

}
