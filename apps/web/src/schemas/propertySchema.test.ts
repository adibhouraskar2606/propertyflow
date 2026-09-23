import { describe, expect, it } from "vitest";

import { propertySchema } from "./propertySchema";

describe("propertySchema", () => {
  it("accepts valid property data", () => {
    const result = propertySchema.safeParse({
      name: "Riverbend Apartments",
      address: "500 River Drive",
      city: "Ogden",
      state: "ut",
      zipCode: "84401",
      units: 10,
      occupiedUnits: 8,
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.state).toBe("UT");
    }
  });

  it("rejects an invalid ZIP code", () => {
    const result = propertySchema.safeParse({
      name: "Riverbend Apartments",
      address: "500 River Drive",
      city: "Ogden",
      state: "UT",
      zipCode: "123",
      units: 10,
      occupiedUnits: 8,
    });

    expect(result.success).toBe(false);
  });

  it("rejects occupied units greater than total units", () => {
    const result = propertySchema.safeParse({
      name: "Riverbend Apartments",
      address: "500 River Drive",
      city: "Ogden",
      state: "UT",
      zipCode: "84401",
      units: 3,
      occupiedUnits: 8,
    });

    expect(result.success).toBe(false);
  });
});