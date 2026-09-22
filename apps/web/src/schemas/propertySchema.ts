import { z } from "zod";

export const propertySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Property name is required")
      .max(100, "Property name must be 100 characters or less"),

    address: z
      .string()
      .trim()
      .min(1, "Street address is required"),

    city: z
      .string()
      .trim()
      .min(1, "City is required"),

    state: z
      .string()
      .trim()
      .length(2, "State must be a 2-letter abbreviation")
      .transform((value) => value.toUpperCase()),

    zipCode: z
      .string()
      .trim()
      .regex(/^\d{5}$/, "ZIP code must contain 5 digits"),

    units: z
      .number()
      .int("Total units must be a whole number")
      .min(1, "Property must have at least 1 unit"),

    occupiedUnits: z
      .number()
      .int("Occupied units must be a whole number")
      .min(0, "Occupied units cannot be negative"),
  })
  .refine(
    (data) => data.occupiedUnits <= data.units,
    {
      message: "Occupied units cannot exceed total units",
      path: ["occupiedUnits"],
    }
  );

export type PropertyFormData = z.infer<
  typeof propertySchema
>;