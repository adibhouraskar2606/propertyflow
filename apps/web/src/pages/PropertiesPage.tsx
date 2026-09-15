import { properties } from "../services/mockProperties";

function PropertiesPage() {
  return (
    <main>
      <h1>Properties</h1>

      {properties.map((property) => (
        <div key={property.id}>
          <h2>{property.name}</h2>

          <p>
            {property.address}, {property.city}, {property.state}
          </p>

          <p>{property.units} units</p>
        </div>
      ))}
    </main>
  );
}

export default PropertiesPage;