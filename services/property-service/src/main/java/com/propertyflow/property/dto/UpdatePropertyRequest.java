package com.propertyflow.property.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdatePropertyRequest(

        @NotBlank(message = "Name is required")
        @Size(max = 100, message = "Name must not exceed 100 characters")
        String name,

        @NotBlank(message = "Address is required")
        @Size(max = 255, message = "Address must not exceed 255 characters")
        String address,

        @NotBlank(message = "City is required")
        @Size(max = 100, message = "City must not exceed 100 characters")
        String city,

        @NotBlank(message = "State is required")
        @Pattern(
                regexp = "^[A-Za-z]{2}$",
                message = "State must be a 2-letter abbreviation"
        )
        String state,

        @NotBlank(message = "ZIP code is required")
        @Pattern(
                regexp = "^\\d{5}$",
                message = "ZIP code must contain exactly 5 digits"
        )
        String zipCode,

        @Min(value = 1, message = "Units must be at least 1")
        int units,

        @Min(value = 0, message = "Occupied units cannot be negative")
        int occupiedUnits
) {
}