import { Listing } from "../types/global.types";
import { parkingClient } from "./api-config";

export const createParking = async (parkingData: Listing) => {
  try {
    const response = await parkingClient.post("/", parkingData);
    if (response.status === 201) {
      console.log("Parking created successfully");
      return response.data;
    } else {
      throw new Error("Error creating parking");
    }
  } catch (error) {
    console.error("Error creating parking", error);
    throw error;
  }
};

export const getParkings = async () => {
  try {
    const response = await parkingClient.get("/");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error fetching parkings");
    }
  } catch (error) {
    console.error("Error fetching parkings", error);
    throw error;
  }
};

export const getParking = async (listingId: string) => {
  try {
    const response = await parkingClient.get(`/${listingId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error fetching parking");
    }
  } catch (error) {
    console.error("Error fetching parking", error);
    throw error;
  }
};

export const deleteParking = async (parkingId: string, ownerId: string) => {
  try {
    const response = await parkingClient.delete("/", {
      data: { parking_id: parkingId, owner_id: ownerId },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error deleting parking");
    }
  } catch (error) {
    console.error("Error deleting parking", error);
    throw error;
  }
};

export const markParkingAsRented = async (
  parkingId: string,
  ownerId: string
) => {
  try {
    const response = await parkingClient.put(`/${parkingId}`, {
      owner_id: ownerId,
      is_available: false,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error marking parking as rented");
    }
  } catch (error) {
    console.error("Error marking parking as rented", error);
    throw error;
  }
};

export const getParkingsUsingUserId = async (userId: string) => {
  try {
    const response = await parkingClient.get(`/user/${userId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error fetching parkings");
    }
  } catch (error) {
    console.error("Error fetching parkings", error);
    throw error;
  }
};
