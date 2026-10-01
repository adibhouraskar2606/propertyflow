package com.propertyflow.property.controller;

import com.propertyflow.property.dto.CreatePropertyRequest;
import com.propertyflow.property.dto.PropertyResponse;
import com.propertyflow.property.dto.UpdatePropertyRequest;
import com.propertyflow.property.service.PropertyService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(
            PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public List<PropertyResponse> getProperties() {
        return propertyService.getProperties();
    }

    @GetMapping("/{id}")
    public PropertyResponse getPropertyById(
            @PathVariable Long id) {
        return propertyService.getPropertyById(id);
    }

    @PostMapping
    public ResponseEntity<PropertyResponse> createProperty(
            @Valid @RequestBody CreatePropertyRequest request) {
        PropertyResponse property = propertyService.createProperty(request);

        return ResponseEntity
                .created(
                        URI.create(
                                "/api/properties/" + property.id()))
                .body(property);
    }

    @PutMapping("/{id}")
    public PropertyResponse updateProperty(
            @PathVariable Long id,
            @Valid @RequestBody UpdatePropertyRequest request) {
        return propertyService.updateProperty(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProperty(
            @PathVariable Long id) {
        propertyService.deleteProperty(id);
    }
}