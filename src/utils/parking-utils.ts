import { VehicleTypeToDimensions } from "../types/create-listing-form.types";
import { Listing, ListingOnMap } from "../types/global.types";
import { vehicleTypeToDimensions } from "./create-listing-form.utils";

export const getListingFromResultsGivenId = (
  listingOnMaps: ListingOnMap[],
  id: string
): Listing | null => {
  const listing = listingOnMaps.find(
    (listingOnMap) => listingOnMap.properties.id === id
  );
  if (listing) {
    return convertListingOnMapObjToListingObj(listing);
  }
  return null;
};

export const convertListingOnMapObjToListingObj = (
  listingOnMap: ListingOnMap
): Listing => {
  const { properties } = listingOnMap;
  return properties;
};

export const parseStorageType = (storage_type: string) => {
  if (storage_type === "outdoor") {
    return "Outdoor storage";
  } else if (storage_type === "indoor") {
    return "Indoor storage";
  }
  return "";
};

export const parseVehicleType = (vehicle_type: keyof VehicleTypeToDimensions) => {

  if (!vehicleTypeToDimensions[vehicle_type]) {
    return vehicle_type;
  }

  return vehicleTypeToDimensions[vehicle_type];
};