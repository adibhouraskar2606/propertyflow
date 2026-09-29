package com.propertyflow.property.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "properties")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(nullable = false, length = 2)
    private String state;

    @Column(name = "zip_code", nullable = false, length = 5)
    private String zipCode;

    @Column(nullable = false)
    private int units;

    @Column(name = "occupied_units", nullable = false)
    private int occupiedUnits;

    protected Property() {
    }

    public Property(
            String name,
            String address,
            String city,
            String state,
            String zipCode,
            int units,
            int occupiedUnits
    ) {
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.units = units;
        this.occupiedUnits = occupiedUnits;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public int getUnits() {
        return units;
    }

    public int getOccupiedUnits() {
        return occupiedUnits;
    }
}