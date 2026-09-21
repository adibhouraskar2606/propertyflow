import { useNavigate, useParams } from "react-router-dom";
import { properties } from "../services/mockProperties";
import { units } from "../services/mockUnits";
import UnitCard from "../components/UnitCard";

function PropertyDetailsPage() {
    const { propertyId } = useParams();

    const property = properties.find(
        (property) => property.id === Number(propertyId)
    );


    const navigate = useNavigate();

    if (!property) {
        return (
            <main>
                <h1>Property Not Found</h1>

                <p>The requested property could not be found.</p>

                <button
                    type="button"
                    onClick={() => navigate("/properties")}
                >
                    Back to Properties
                </button>
            </main>
        );
    }

    const propertyUnits = units.filter(
        (unit) => unit.propertyId === property.id
    );

    return (
        <main>
            <button
                type="button"
                onClick={() => navigate("/properties")}
            >
                ← Back to Properties
            </button>

            <h1>{property.name}</h1>

            <p>
                {property.address}
                <br />
                {property.city}, {property.state}{" "}
                {property.zipCode}
            </p>

            <section>
                <h2>Property Overview</h2>

                <p>Total Units: {property.units}</p>
                <p>Occupied Units: {property.occupiedUnits}</p>
                <p>
                    Available Units:{" "}
                    {property.units - property.occupiedUnits}
                </p>
            </section>

            <section>
                <h2>Units</h2>

                {propertyUnits.length === 0 ? (
                    <p>No units have been added to this property.</p>
                ) : (
                    <div>
                        {propertyUnits.map((unit) => (
                            <UnitCard
                                key={unit.id}
                                unit={unit}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default PropertyDetailsPage;