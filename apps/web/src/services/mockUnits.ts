import type { Unit } from "../types/unit";

export const units: Unit[] = [
  {
    id: 1,
    propertyId: 1,
    unitNumber: "101",
    bedrooms: 2,
    bathrooms: 1.5,
    monthlyRent: 1450,
    status: "OCCUPIED",
  },
  {
    id: 2,
    propertyId: 1,
    unitNumber: "102",
    bedrooms: 2,
    bathrooms: 1.5,
    monthlyRent: 1450,
    status: "OCCUPIED",
  },
  {
    id: 3,
    propertyId: 1,
    unitNumber: "103",
    bedrooms: 3,
    bathrooms: 2,
    monthlyRent: 1800,
    status: "OCCUPIED",
  },

  {
    id: 4,
    propertyId: 2,
    unitNumber: "201",
    bedrooms: 1,
    bathrooms: 1,
    monthlyRent: 1200,
    status: "OCCUPIED",
  },
  {
    id: 5,
    propertyId: 2,
    unitNumber: "202",
    bedrooms: 1,
    bathrooms: 1,
    monthlyRent: 1200,
    status: "VACANT",
  },
];