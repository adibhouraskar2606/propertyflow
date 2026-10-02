import type { CreatePropertyRequest, Property } from "../types/property";
import { ApiError, type ApiErrorResponse } from "./apiError";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not configured");
}

async function apiRequest<T>(
    path: string,
    options?: RequestInit,
): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!response.ok) {
        const error =
            (await response.json()) as ApiErrorResponse;

        throw new ApiError(error);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}

export function getProperties(): Promise<Property[]> {
    return apiRequest<Property[]>("/api/properties");
}

export function getProperty(
    id: number,
): Promise<Property> {
    return apiRequest<Property>(
        `/api/properties/${id}`,
    );
}

export function createProperty(
    property: CreatePropertyRequest,
): Promise<Property> {
    return apiRequest<Property>("/api/properties", {
        method: "POST",
        body: JSON.stringify(property),
    });
}

export function updateProperty(
    id: number,
    property: CreatePropertyRequest,
): Promise<Property> {
    return apiRequest<Property>(
        `/api/properties/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(property),
        },
    );
}

export function deleteProperty(
    id: number,
): Promise<void> {
    return apiRequest<void>(
        `/api/properties/${id}`,
        {
            method: "DELETE",
        },
    );
}