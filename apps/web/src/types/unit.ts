export type UnitStatus = "OCCUPIED" | "VACANT";

export interface Unit {
  id: number;
  propertyId: number;
  unitNumber: string;
  bedrooms: number;
  bathrooms: number;
  monthlyRent: number;
  status: UnitStatus;
}