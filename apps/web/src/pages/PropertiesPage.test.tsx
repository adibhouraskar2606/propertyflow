import {
    render,
    screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";
import { getProperties } from "../api/propertiesApi";
import PropertiesPage from "./PropertiesPage";

vi.mock("../api/propertiesApi", () => ({
    getProperties: vi.fn(),
}));

const mockedGetProperties = vi.mocked(getProperties);

const mockProperties = [
    {
        id: 1,
        name: "Mountain View Townhomes",
        address: "1250 Harrison Blvd",
        city: "Ogden",
        state: "UT",
        zipCode: "84403",
        units: 3,
        occupiedUnits: 3,
    },
    {
        id: 2,
        name: "Downtown Apartments",
        address: "250 Grant Ave",
        city: "Ogden",
        state: "UT",
        zipCode: "84401",
        units: 8,
        occupiedUnits: 6,
    },
];

beforeEach(() => {
    vi.clearAllMocks();

    mockedGetProperties.mockResolvedValue(
        mockProperties,
    );
});

describe("PropertiesPage", () => {
    it("renders the property list", async () => {
        render(
            <MemoryRouter>
                <PropertiesPage />
            </MemoryRouter>
        );

        expect(
            await screen.findByText("Mountain View Townhomes"),
        ).toBeInTheDocument();

        expect(
            screen.getByText("Downtown Apartments")
        ).toBeInTheDocument();
    });

    it("filters properties based on search input", async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <PropertiesPage />
            </MemoryRouter>
        );

        const searchInput = await screen.findByRole(
            "textbox",
            {
                name: /search properties/i,
            },
        );

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

        const searchInput = await screen.findByRole("textbox", {
            name: /search properties/i,
        });

        await user.type(searchInput, "does-not-exist");

        expect(
            screen.getByText("No properties found.")
        ).toBeInTheDocument();
    });

    it("shows a loading indicator while properties are loading", () => {
        mockedGetProperties.mockReturnValue(
            new Promise(() => { }),
        );

        render(
            <MemoryRouter>
                <PropertiesPage />
            </MemoryRouter>,
        );

        expect(
            screen.getByRole("progressbar"),
        ).toBeInTheDocument();
    });

    it("shows an error when properties cannot be loaded", async () => {
        mockedGetProperties.mockRejectedValue(
            new Error("Network error"),
        );

        render(
            <MemoryRouter>
                <PropertiesPage />
            </MemoryRouter>,
        );

        expect(
            await screen.findByText(
                /unable to load properties/i,
            ),
        ).toBeInTheDocument();
    });
});