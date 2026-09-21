import type { Unit } from "../types/unit";

interface UnitCardProps {
  unit: Unit;
}

function UnitCard({ unit }: UnitCardProps) {
  return (
    <article>
      <h3>Unit {unit.unitNumber}</h3>

      <p>
        {unit.bedrooms} bed • {unit.bathrooms} bath
      </p>

      <p>
        Rent: ${unit.monthlyRent.toLocaleString()}/month
      </p>

      <p>Status: {unit.status}</p>
    </article>
  );
}

export default UnitCard;