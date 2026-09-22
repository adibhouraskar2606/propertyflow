import {
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Stack,
    Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import type { Property } from "../types/property";

interface PropertyCardProps {
    property: Property;
}
function PropertyCard({ property }: PropertyCardProps) {
    const navigate = useNavigate();

    const occupancyRate =
        property.units === 0
            ? 0
            : Math.round(
                (property.occupiedUnits / property.units) * 100
            );

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6">
                    {property.name}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    {property.address}
                    <br />

                    {property.city}, {property.state}{" "}
                    {property.zipCode}
                </Typography>

                <Stack
                    direction="row"
                    sx={{
                        flexWrap: "wrap",
                        gap: 1,
                    }}
                >
                    <Chip
                        label={`${property.units} units`}
                        size="small"
                    />

                    <Chip
                        label={`${property.occupiedUnits} occupied`}
                        size="small"
                    />

                    <Chip
                        label={`${occupancyRate}% occupancy`}
                        size="small"
                    />
                </Stack>
            </CardContent>

            <CardActions>
                <Button
                    onClick={() =>
                        navigate(`/properties/${property.id}`)
                    }
                >
                    View Property
                </Button>
            </CardActions>
        </Card>
    );
}

export default PropertyCard;