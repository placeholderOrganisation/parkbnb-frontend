import { autocompleteAddress, geocodeAddress } from "../api/geocoding-api";
import { AutocompleteResponse, AutocompleteUtilFunctionResponse } from "../types/global.types";

export interface HandleGeocodeResponse {
  lat?: number;
  lng?: number;
  success: boolean;
  error?: any;
}

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
    const response = await autocompleteAddress(address);
    return { results: response.results, success: true };
  } catch (error) {
    console.error("Error auto completing address", error);
    return { error, success: false };
  }
};
