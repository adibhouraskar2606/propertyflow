import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import { properties } from "../services/mockProperties";
import { useState } from "react";

function PropertiesPage() {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");

    const filteredProperties = properties.filter((property) => {
        const search = searchTerm.toLowerCase();

        return (
            property.name.toLowerCase().includes(search) ||
            property.city.toLowerCase().includes(search) ||
            property.state.toLowerCase().includes(search)
        );
    });

    const totalUnits = properties.reduce(
        (total, property) => total + property.units,
        0
    );

    const occupiedUnits = properties.reduce(
        (total, property) => total + property.occupiedUnits,
        0
    );

    return (
        <main>
            <h1>Properties</h1>

            <p>Manage your Rental Property Portfolio</p>

            <button
                type="button"
                onClick={() => navigate("/properties/new")}
            >
                + Add Property
            </button>

            <p>
                {properties.length} properties • {totalUnits} units • {occupiedUnits} occupied
            </p>

            <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />

            {filteredProperties.length === 0 ? (
                <p>No properties found.</p>
            ) : (
                <section>
                    {filteredProperties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                        />
                    ))}
                </section>
            )}
        </main>
    );
}

export default PropertiesPage;