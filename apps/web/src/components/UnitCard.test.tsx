import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import UnitCard from "./UnitCard";
import type { Unit } from "../types/unit";

describe("UnitCard", () => {
  it("displays unit information", () => {
    const unit: Unit = {
      id: 1,
      propertyId: 1,
      unitNumber: "101",
      bedrooms: 2,
      bathrooms: 1.5,
      monthlyRent: 1450,
      status: "OCCUPIED",
    };

    render(<UnitCard unit={unit} />);

    expect(
      screen.getByText("Unit 101")
    ).toBeInTheDocument();

    expect(
      screen.getByText("2 bed • 1.5 bath")
    ).toBeInTheDocument();

    expect(
      screen.getByText("$1,450 / month")
    ).toBeInTheDocument();

    expect(
      screen.getByText("OCCUPIED")
    ).toBeInTheDocument();
  });
});