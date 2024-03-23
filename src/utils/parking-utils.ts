import { VehicleTypeToDimensions } from "../types/create-listing-form.types";
import { FilterTypes, Listing, ListingOnMap } from "../types/global.types";
import { vehicleTypeToDimensions } from "./create-listing-form.utils";
import dayjs from "dayjs";

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

export const parseVehicleType = (
  vehicle_type: keyof VehicleTypeToDimensions
) => {
  if (!vehicleTypeToDimensions[vehicle_type]) {
    return vehicle_type;
  }

  return vehicleTypeToDimensions[vehicle_type];
};

export const formatParkingFilterName = (filterName: keyof FilterTypes) => {
  return filterName.split("_").join(" ");
};

export const formatDate = (date: string) => {
  return dayjs(date).format("MM/DD/YYYY");
};

export const getMonthsPassedOrDaysOrHours = (date: string): string => {
  const currentDate = dayjs();
  const startDate = dayjs(date);
  const daysPassed = currentDate.diff(startDate, "day");
  const hoursPassed = currentDate.diff(startDate, "hour");

  if (daysPassed > 30) {
    const monthsPassed = currentDate.diff(startDate, "month");
    return `${monthsPassed} month ago`;
  } else if (hoursPassed > 24) {
    const daysPassed = currentDate.diff(startDate, "day");
    return `${daysPassed} days ago`;
  } else {
    return `${hoursPassed} hours ago`;
  }
};