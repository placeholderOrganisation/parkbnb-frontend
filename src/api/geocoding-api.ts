import { AutocompleteUtilFunctionResponse } from "../types/global.types";
import { geocodingClient } from "./api-config";

export const geocodeAddress = async (address: string) => {
  try {
    const response = await geocodingClient.post("/", { address });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error geo coding address");
    }
  } catch (error) {
    console.error("Error geo coding address", error);
    throw error;
  }
};

export const autocompleteAddress = async (address: string): Promise<AutocompleteUtilFunctionResponse> => {
  try {
    const response = await geocodingClient.post("/autocomplete", { address });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error auto completing address");
    }
  } catch (error) {
    console.error("Error auto completing address", error);
    throw error;
  }
}
