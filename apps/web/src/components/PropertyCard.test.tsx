import {
    render,
    screen,
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import PropertyCard from "./PropertyCard";
import type { Property } from "../types/property";

describe("PropertyCard", () => {
    it("displays property information", () => {
        const property: Property = {
            id: 1,
            name: "Mountain View Townhomes",
            address: "1250 Harrison Blvd",
            city: "Ogden",
            state: "UT",
            zipCode: "84403",
            units: 3,
            occupiedUnits: 3,
        };

        render(
            <MemoryRouter>
                <PropertyCard property={property} />
            </MemoryRouter>
        );

        expect(
            screen.getByText("Mountain View Townhomes")
        ).toBeInTheDocument();

        expect(
            screen.getByText("3 units")
        ).toBeInTheDocument();

        expect(
            screen.getByText("3 occupied")
        ).toBeInTheDocument();

        expect(
            screen.getByText("100% occupancy")
        ).toBeInTheDocument();
    });

    it("calculates occupancy percentage", () => {
        const property: Property = {
            id: 2,
            name: "Downtown Apartments",
            address: "245 Washington Blvd",
            city: "Ogden",
            state: "UT",
            zipCode: "84401",
            units: 8,
            occupiedUnits: 6,
        };

        render(
            <MemoryRouter>
                <PropertyCard property={property} />
            </MemoryRouter>
        );

        expect(
            screen.getByText("75% occupancy")
        ).toBeInTheDocument();
    });
});