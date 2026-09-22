import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./CreatePropertyPage.css";

import {
    propertySchema,
    type PropertyFormData,
} from "../schemas/propertySchema";

function CreatePropertyPage() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
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

    const onSubmit = (data: PropertyFormData) => {
        console.log("Property submitted:", data);

        navigate("/properties");
    };

    return (
        <main>
            <h1>Add Property</h1>

            <p>Add a new property to your portfolio.</p>

            <form className="property-form"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="form-field">
                    <label htmlFor="name">
                        Property Name
                    </label>

                    <input id="name" type="text" {...register("name")} />

                    {errors.name && (
                        <p className="form-error">{errors.name.message}</p>
                    )}
                </div>
                <div className="form-field">
                    <label htmlFor="address">
                        Street Address
                    </label>

                    <input
                        id="address"
                        type="text"
                        {...register("address")}
                    />

                    {errors.address && (
                        <p className="form-error">{errors.address.message}</p>
                    )}
                </div>
                <div className="form-field">
                    <label htmlFor="city">
                        City
                    </label>

                    <input
                        id="city"
                        type="text"
                        {...register("city")}
                    />

                    {errors.city && (
                        <p className="form-error">{errors.city.message}</p>
                    )}
                </div>
                <div className="form-field">
                    <label htmlFor="state">
                        State
                    </label>

                    <input
                        id="state"
                        type="text"
                        maxLength={2}
                        {...register("state")}
                    />

                    {errors.state && (
                        <p className="form-error">{errors.state.message}</p>
                    )}
                </div>
                <div className="form-field">
                    <label htmlFor="zipCode">
                        ZIP Code
                    </label>

                    <input
                        id="zipCode"
                        type="text"
                        {...register("zipCode")}
                    />

                    {errors.zipCode && (
                        <p className="form-error">{errors.zipCode.message}</p>
                    )}
                </div>
                <div className="form-field">
                    <label htmlFor="units">
                        Total Units
                    </label>

                    <input
                        id="units"
                        type="number"
                        min={1}
                        {...register("units", {
                            valueAsNumber: true,
                        })}
                    />

                    {errors.units && (
                        <p className="form-error">{errors.units.message}</p>
                    )}
                </div>
                <div className="form-field">
                    <label htmlFor="occupiedUnits">
                        Occupied Units
                    </label>

                    <input
                        id="occupiedUnits"
                        type="number"
                        min={0}
                        {...register("occupiedUnits", {
                            valueAsNumber: true,
                        })}
                    />

                    {errors.occupiedUnits && (
                        <p className="form-error">{errors.occupiedUnits.message}</p>
                    )}
                </div>
                <div className="form-actions">
                    <button
                        type="button"
                        onClick={() => navigate("/properties")}
                    >
                        Cancel
                    </button>

                    <button type="submit">
                        Create Property
                    </button>
                </div>
            </form>
        </main>
    );
}

export default CreatePropertyPage;