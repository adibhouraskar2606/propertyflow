import { useNavigate } from "react-router-dom";
import type { Property } from "../types/property";
import Button from "./Button";
import "./PropertyCard.css";

interface PropertyCardProps {
    property: Property;
}

function PropertyCard({ property }: PropertyCardProps) {
    const occupancyRate =
        property.units === 0
            ? 0
            : Math.round(
                (property.occupiedUnits / property.units) * 100
            );
    const navigate = useNavigate();
    return (
        <article className="property-card">
            <h2>{property.name}</h2>

            <p>{property.address}</p>

            <p>
                {property.city}, {property.state} {property.zipCode}
            </p>

            <p>Total units: {property.units}</p>

            <p>Occupied: {property.occupiedUnits}</p>

            <p>Occupancy: {occupancyRate}%</p>

            <Button
                onClick={() => navigate(`/properties/${property.id}`)}
            >
                View Property
            </Button>
        </article>
    );
}

export default PropertyCard;