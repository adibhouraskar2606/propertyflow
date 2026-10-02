import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import { useEffect, useState } from "react";
import { getProperties } from "../api/propertiesApi";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import type { Property } from "../types/property";

function PropertiesPage() {
    const navigate = useNavigate();

    const [properties, setProperties] = useState<Property[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProperties() {
            try {
                setIsLoading(true);
                setError(null);

                const data = await getProperties();

                setProperties(data);
            } catch (err) {
                console.error(err);
                setError("Unable to load properties.");
            } finally {
                setIsLoading(false);
            }
        }

        void loadProperties();
    }, []);

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
    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">
                    {error}
                </Alert>
            </Box>
        );
    }

    if (isLoading) {
        return (
            <Box sx={{ p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <Box>
            <Stack
                direction="row"
                sx={{
                    mb: 3,
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Box>
                    <Typography variant="h4">
                        Properties
                    </Typography>

                    <Typography color="text.secondary">
                        Manage your rental property portfolio.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/properties/new")}
                >
                    Add Property
                </Button>
            </Stack>

            <Typography sx={{ mb: 2 }}>
                {properties.length} properties • {totalUnits} units •{" "}
                {occupiedUnits} occupied
            </Typography>

            <TextField
                label="Search properties"
                value={searchTerm}
                onChange={(event) =>
                    setSearchTerm(event.target.value)
                }
                size="small"
                sx={{
                    mb: 3,
                    width: {
                        xs: "100%",
                        sm: 400,
                    },
                }}
            />

            {filteredProperties.length === 0 ? (
                <Typography color="text.secondary">
                    No properties found.
                </Typography>
            ) : (
                <Stack spacing={2}>
                    {filteredProperties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                        />
                    ))}
                </Stack>
            )}
        </Box>
    );
}

export default PropertiesPage;