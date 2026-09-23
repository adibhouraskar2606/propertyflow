import {
    render,
    screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import PropertiesPage from "./PropertiesPage";

describe("PropertiesPage", () => {
    it("renders the property list", () => {
        render(
            <MemoryRouter>
                <PropertiesPage />
            </MemoryRouter>
        );

        expect(
            screen.getByText("Mountain View Townhomes")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Downtown Apartments")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Canyon Ridge Apartments")
        ).toBeInTheDocument();
    });

    it("filters properties based on search input", async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <PropertiesPage />
            </MemoryRouter>
        );

        const searchInput = screen.getByRole("textbox", {
            name: /search properties/i,
        });

        await user.type(searchInput, "Mountain");

        expect(
            screen.getByText("Mountain View Townhomes")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("Downtown Apartments")
        ).not.toBeInTheDocument();

        expect(
            screen.queryByText("Canyon Ridge Apartments")
        ).not.toBeInTheDocument();
    });
    
    it("displays an empty state when no properties match", async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <PropertiesPage />
            </MemoryRouter>
        );

        const searchInput = screen.getByRole("textbox", {
            name: /search properties/i,
        });

        await user.type(searchInput, "does-not-exist");

        expect(
            screen.getByText("No properties found.")
        ).toBeInTheDocument();
    });
});