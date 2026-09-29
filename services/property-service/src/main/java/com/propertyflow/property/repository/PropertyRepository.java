package com.propertyflow.property.repository;

import com.propertyflow.property.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository
        extends JpaRepository<Property, Long> {
}