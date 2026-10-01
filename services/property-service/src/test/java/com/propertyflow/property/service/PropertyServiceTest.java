package com.propertyflow.property.service;

import com.propertyflow.property.dto.CreatePropertyRequest;
import com.propertyflow.property.dto.PropertyResponse;
import com.propertyflow.property.exception.InvalidPropertyException;
import com.propertyflow.property.exception.PropertyNotFoundException;
import com.propertyflow.property.model.Property;
import com.propertyflow.property.repository.PropertyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PropertyServiceTest {

    private PropertyRepository propertyRepository;
    private PropertyService propertyService;

    @BeforeEach
    void setUp() {
        propertyRepository =
                Mockito.mock(PropertyRepository.class);

        propertyService =
                new PropertyService(propertyRepository);
    }

    @Test
    void shouldReturnPropertyById() {
        Property property = new Property(
                "Mountain View Townhomes",
                "1250 Harrison Blvd",
                "Ogden",
                "UT",
                "84403",
                3,
                3
        );

        when(propertyRepository.findById(1L))
                .thenReturn(Optional.of(property));

        PropertyResponse result =
                propertyService.getPropertyById(1L);

        assertEquals(
                "Mountain View Townhomes",
                result.name()
        );

        verify(propertyRepository).findById(1L);
    }

    @Test
    void shouldThrowWhenPropertyDoesNotExist() {
        when(propertyRepository.findById(999L))
                .thenReturn(Optional.empty());

        assertThrows(
                PropertyNotFoundException.class,
                () -> propertyService.getPropertyById(999L)
        );
    }

    @Test
    void shouldRejectOccupiedUnitsGreaterThanUnits() {
        CreatePropertyRequest request =
                new CreatePropertyRequest(
                        "Test Property",
                        "123 Test Street",
                        "Ogden",
                        "UT",
                        "84401",
                        3,
                        5
                );

        assertThrows(
                InvalidPropertyException.class,
                () -> propertyService.createProperty(request)
        );

        verify(
                propertyRepository,
                never()
        ).save(any());
    }
}