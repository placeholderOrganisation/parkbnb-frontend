import { autocompleteAddress, geocodeAddress } from "../api/geocoding-api";
import { AutocompleteResponse } from "../types/global.types";

export interface HandleGeocodeResponse {
  lat?: number;
  lng?: number;
  success: boolean;
  error?: any;
}

export interface Address {
  street: string;
  city: string;
  province: string;
  postal: string;
  country: string;
}

export const extractAddressFromPlaceName = (
  placeName: string
): Address | null => {
  const placeNameParts = placeName.split(",");
  if (placeNameParts.length === 4) {
    const street = placeNameParts[0].trim();
    const city = placeNameParts[1].trim();
    const provinceAndPostalCode = placeNameParts[2].trim();
    const province = provinceAndPostalCode.slice(0, -8).trim();
    const postal = provinceAndPostalCode.slice(-7).trim();
    const country = placeNameParts[3].trim();

    return {
      street,
      city,
      province,
      postal,
      country,
    };
  }
  return null;
};

export const handleGeocode = async (
  address: string
): Promise<HandleGeocodeResponse> => {
  try {
    const response = await geocodeAddress(address);
    return { lat: response.lat, lng: response.lng, success: true };
  } catch (error) {
    console.error("Error geo coding address", error);
    return { error, success: false };
  }
};

export interface HandleAutocompleteResponse {
  results?: AutocompleteResponse[];
  success: boolean;
  error?: any;
}

export const handleAutocomplete = async (
  address: string
): Promise<HandleAutocompleteResponse> => {
  try {
    if (!address) {
      return { error: "Address is required", success: false };
    }
    const response = await autocompleteAddress(address);
    return { results: response.results, success: true };
  } catch (error) {
    console.error("Error auto completing address", error);
    return { error, success: false };
  }
};
