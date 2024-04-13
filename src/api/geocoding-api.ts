import { geocodingClient } from "./api-config";

export const geocodeAddress = async (address: string) => {
  try {
    const response = await geocodingClient.post("", { address });
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
