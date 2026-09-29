CREATE TABLE properties (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip_code VARCHAR(5) NOT NULL,
    units INTEGER NOT NULL,
    occupied_units INTEGER NOT NULL,

    CONSTRAINT chk_properties_units
        CHECK (units >= 1),

    CONSTRAINT chk_properties_occupied_units
        CHECK (
            occupied_units >= 0
            AND occupied_units <= units
        )
);

