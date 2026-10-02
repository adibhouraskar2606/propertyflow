import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProperty } from "../api/propertiesApi";
import {
    Alert,
    Box,
    Button,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    propertySchema,
    type PropertyFormData,
} from "../schemas/propertySchema";
import { useState } from "react";
import { ApiError } from "../api/apiError";

function CreatePropertyPage() {
    const navigate = useNavigate();

    const [submitError, setSubmitError] =
        useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        }
    } = useForm<PropertyFormData>({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            name: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            units: 1,
            occupiedUnits: 0,
        },
    });

    const onSubmit = async (
        data: PropertyFormData,
    ) => {
        try {
            setSubmitError(null);

            await createProperty(data);

            navigate("/properties");
        } catch (error) {
            console.error(
                "Failed to create property:",
                error,
            );

            if (error instanceof ApiError) {
                setSubmitError(error.message);
            } else {
                setSubmitError(
                    "Unable to create property. Please try again.",
                );
            }
        }
    };

    return (
        <Box sx={{ maxWidth: 700 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
                Add Property
            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mb: 3 }}
            >
                Add a new property to your portfolio.
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <TextField
                        label="Property Name"
                        fullWidth
                        {...register("name")}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                    />

                    <TextField
                        label="Street Address"
                        fullWidth
                        {...register("address")}
                        error={Boolean(errors.address)}
                        helperText={errors.address?.message}
                    />

                    <TextField
                        label="City"
                        fullWidth
                        {...register("city")}
                        error={Boolean(errors.city)}
                        helperText={errors.city?.message}
                    />

                    <TextField
                        label="State"
                        fullWidth
                        slotProps={{
                            htmlInput: {
                                maxLength: 2,
                            },
                        }}
                        {...register("state")}
                        error={Boolean(errors.state)}
                        helperText={errors.state?.message}
                    />

                    <TextField
                        label="ZIP Code"
                        fullWidth
                        {...register("zipCode")}
                        error={Boolean(errors.zipCode)}
                        helperText={errors.zipCode?.message}
                    />

                    <TextField
                        label="Total Units"
                        type="number"
                        fullWidth
                        {...register("units", {
                            valueAsNumber: true,
                        })}
                        error={Boolean(errors.units)}
                        helperText={errors.units?.message}
                    />

                    <TextField
                        label="Occupied Units"
                        type="number"
                        fullWidth
                        {...register("occupiedUnits", {
                            valueAsNumber: true,
                        })}
                        error={Boolean(errors.occupiedUnits)}
                        helperText={errors.occupiedUnits?.message}
                    />

                    {submitError && (
                        <Alert severity="error">
                            {submitError}
                        </Alert>
                    )}
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ justifyContent: "flex-end" }}
                    >
                        <Button
                            type="button"
                            onClick={() => navigate("/properties")}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Creating..."
                                : "Create Property"}
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
}

export default CreatePropertyPage;