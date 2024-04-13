import { geocodeAddress } from "../api/geocoding-api";

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
