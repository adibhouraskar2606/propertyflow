package com.propertyflow.property.service;

import com.propertyflow.property.model.Property;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class PropertyServiceTest {

    private final PropertyService propertyService =
            new PropertyService();

    @Test
    void shouldReturnAllProperties() {
        List<Property> properties =
                propertyService.getProperties();

        assertEquals(3, properties.size());
    }

    @Test
    void shouldReturnPropertyById() {
        Property property =
                propertyService.getPropertyById(1L);

        assertNotNull(property);
        assertEquals(
                "Mountain View Townhomes",
                property.name()
        );
    }

    @Test
    void shouldReturnNullForUnknownProperty() {
        Property property =
                propertyService.getPropertyById(999L);

        assertNull(property);
    }
}