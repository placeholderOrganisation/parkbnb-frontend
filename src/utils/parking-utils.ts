import {
  DimensionFilterTypes,
  DIMENSIONS_ENUMS,
  FilterTypes,
  Listing,
  ListingOnMap,
  VEHICLE_TYPE_ENUMS,
  VehicleTypeFilterTypes,
} from "../types/global.types";
import dayjs, { Dayjs } from "dayjs";
import {
  createParking,
  deleteParking,
  getParking,
  getParkings,
  getParkingsUsingUserId,
  markParkingAsRented,
} from "../api/parking-api";
import {
  StepOneState,
  StepThreeState,
  StepTwoState,
} from "../types/create-listing-form.types";
import { getItemFromCookies } from "./storage-utils";

export const getListingFromListingOnMapResultsGivenId = (
  listingOnMaps: ListingOnMap[],
  id: string
): Listing | null => {
  const listing = listingOnMaps.find(
    (listingOnMap) => listingOnMap.properties._id === id
  );
  if (listing) {
    return convertListingOnMapObjToListingObj(listing);
  }
  return null;
};

export const getListingFromListingArrayGivenId = (
  listings: Listing[],
  id: string
): Listing | null => {
  const listing = listings.find((listing) => listing._id === id);
  if (listing) {
    return listing;
  }
  return null;
};

export const convertListingOnMapObjToListingObj = (
  listingOnMap: ListingOnMap
): Listing => {
  const { properties } = listingOnMap;
  return properties;
};

export const sortAndFilterParkings = (
  parkings: (Listing | null)[]
): (Listing | null)[] => {
  const sortedParkings = parkings.sort((a, b) => {
    if (!a || !b) {
      return 0;
    }

    if (a.is_scraped && !b.is_scraped) {
      return 1;
    }
    if (!a.is_scraped && b.is_scraped) {
      return -1;
    }
    return 0;
  });

  return sortedParkings;
};

export const convertListingObjToListingOnMapObj = (
  listing: Listing
): ListingOnMap => {
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(listing.address.lng),
        parseFloat(listing.address.lat),
      ],
    },
    properties: listing,
  };
};

export const parseStorageType = (storage_type: string) => {
  if (storage_type === "outdoor") {
    return "Driveway / uncovered lot";
  } else if (storage_type === "indoor") {
    return "Garage / covered lot";
  }
  return "";
};

export const parseVehicleType = (
  vehicle_type: keyof VehicleTypeFilterTypes
) => {
  if (!VEHICLE_TYPE_ENUMS[vehicle_type]) {
    // if we do not find the vehicle type in the mapping, we return the vehicle type as is
    return vehicle_type;
  }

  return VEHICLE_TYPE_ENUMS[vehicle_type].label;
};

export const parseVehicleTypeReturnSize = (
  vehicle_type: keyof VehicleTypeFilterTypes
) => {
  if (!VEHICLE_TYPE_ENUMS[vehicle_type]) {
    // if we do not find the vehicle type in the mapping, we return the max vehicle type size
    return 5;
  }

  return VEHICLE_TYPE_ENUMS[vehicle_type].size;
};

export const parseDimensionsReturnLabel = (
  dimenstionString: keyof DimensionFilterTypes
) => {
  if (!DIMENSIONS_ENUMS[dimenstionString]) {
    // if we do not find the dimension in the mapping, we return the dimension as is
    return dimenstionString;
  }

  return DIMENSIONS_ENUMS[dimenstionString].label;
};

export const parseDimensionsReturnLengthAndWidth = (
  dimenstionString: keyof DimensionFilterTypes
) => {
  if (!DIMENSIONS_ENUMS[dimenstionString]) {
    // if we do not find the dimension in the mapping, we return the dimension as is
    return { length: 0, width: 0 };
  }

  return {
    length: DIMENSIONS_ENUMS[dimenstionString].length,
    width: DIMENSIONS_ENUMS[dimenstionString].width,
  };
};

export const parseLengthAndWidth = (length: number, width: number) => {
  let result = "";
  Object.keys(DIMENSIONS_ENUMS).forEach((dimension) => {
    const d = DIMENSIONS_ENUMS[dimension as keyof DimensionFilterTypes];
    if (d.length === length && d.width === width) {
      result = dimension;
    }
  });
  return result;
};

export const formatParkingFilterName = (filterName: keyof FilterTypes) => {
  return filterName.split("_").join(" ");
};

export const formatDate = (date: string) => {
  return dayjs(date).format("MM/DD/YYYY");
};

export const getMonthsPassedOrDaysOrHours = (date: Dayjs): string => {
  const currentDate = dayjs();
  const startDate = dayjs(date);
  const daysPassed = currentDate.diff(startDate, "day");
  const hoursPassed = currentDate.diff(startDate, "hour");

  if (daysPassed > 30) {
    const monthsPassed = currentDate.diff(startDate, "month");
    if (monthsPassed > 1) {
      return `${monthsPassed} months ago`;
    }
    return `${monthsPassed} month ago`;
  } else if (hoursPassed > 24) {
    const daysPassed = currentDate.diff(startDate, "day");
    if (daysPassed > 1) {
      return `${daysPassed} days ago`;
    }
    return `${daysPassed} day ago`;
  } else {
    if (hoursPassed <= 1) {
      return `1 hour ago`;
    }
    return `${hoursPassed} hours ago`;
  }
};

export const assembleCreateListingBody = (
  stepOneFormData: StepOneState,
  stepTwoFormData: StepTwoState,
  stepThreeFormData: StepThreeState,
  lat: number,
  lng: number,
  ownerId: string,
  ownerContact: string
): Listing => {
  const emptyParkingObject = initializeEmptyParking();

  const {
    street,
    city,
    province,
    postal,
    country,
    dailyRate,
    monthlyRate,
  } = stepOneFormData;

  const parsedLat = lat.toString();
  const parsedLng = lng.toString();
  const address = {
    street,
    city,
    state: province,
    zip: postal,
    country,
    lat: parsedLat,
    lng: parsedLng,
  };

  const price = {
    daily: dailyRate,
    monthly: monthlyRate,
  };

  // filters
  const {
    amenities,
    storageType,
    vehicleTypes,
    dimensions,
    numSpaces,
  } = stepTwoFormData;

  const { images, description } = stepThreeFormData;

  emptyParkingObject.filters = {
    full_day_access: amenities.full_day_access,
    ev_charging: amenities.ev_charging,
    handicap_accessible: amenities.handicap_accessible,
    security_cameras: amenities.security_cameras,
    storage_type: storageType,
    // @ts-ignore
    vehicle_type: vehicleTypes,
    length: dimensions.minLength,
    width: dimensions.minWidth,
    spaces: numSpaces,
  };
  emptyParkingObject.address = address;
  emptyParkingObject.price = price;
  emptyParkingObject.images = images;
  emptyParkingObject.description = description;

  if (ownerId) {
    emptyParkingObject.owner_id = ownerId;
  }

  if (ownerContact) {
    emptyParkingObject.contact = ownerContact;
  }

  return emptyParkingObject;
};

export const initializeEmptyParking = () => {
  const newParkingObject: Listing = {
    filters: {
      security_cameras: false,
      full_day_access: false,
      ev_charging: false,
      handicap_accessible: false,
      storage_type: "",
      // @ts-ignore
      vehicle_type: "",
      length: 0,
      width: 0,
      spaces: 0,
    },
    address: {
      lat: "",
      lng: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    price: {
      daily: 0,
      monthly: 0,
    },
    images: [],
    description: "",
    owner_id: "",
    contact: "",
    is_available: true,
    is_scraped: false,
  };

  return newParkingObject;
};

export const isUserListingOwner = (
  userId: string | null,
  listing: Listing | null
): boolean => {
  if (!listing) {
    return false;
  }

  if (!userId) {
    const userIdInCookie = getItemFromCookies("user");
    return userIdInCookie === listing.owner_id;
  }

  return userId === listing.owner_id;
};

export const formatPostalCode = (postalCode: string) => {
  return postalCode
    .replace(/\s/g, "")
    .toUpperCase()
    .slice(0, 3)
    .concat("")
    .concat(postalCode.slice(3));
};

// api wrappers
export const handleCreateParking = async (parkingData: Listing) => {
  try {
    const data = await createParking(parkingData);
    return { data, success: true };
  } catch (error) {
    console.error("Error creating parking", error);
    return { error, success: false };
  }
};

export const handleGetParkings = async () => {
  try {
    const data = await getParkings();
    return { data, success: true };
  } catch (error) {
    console.error("Error fetching parkings", error);
    return { error, success: false };
  }
};

export const handleGetParking = async (listingId: string) => {
  try {
    const data = await getParking(listingId);
    return { data, success: true };
  } catch (error) {
    console.error("Error fetching parking", error);
    return { error, success: false };
  }
};

export const handleDeleteParking = async (
  parkingId: string,
  ownerId: string | null | ""
) => {
  if (!ownerId) {
    return { error: "Owner Id is not valid", success: false };
  }
  try {
    const data = await deleteParking(parkingId, ownerId);
    return { data, success: true };
  } catch (error) {
    console.error("Error deleting parking", error);
    return { error, success: false };
  }
};

export const handleMarkParkingAsRented = async (
  parkingId: string,
  ownerId: string | null | ""
) => {
  if (!ownerId) {
    return { error: "Owner Id is not valid", success: false };
  }
  try {
    const data = await markParkingAsRented(parkingId, ownerId);
    return { data, success: true };
  } catch (error) {
    console.error("Error marking parking as rented", error);
    return { error, success: false };
  }
};

export const handleGetParkingUsingUserId = async (userId: string) => {
  try {
    const data = await getParkingsUsingUserId(userId);
    return { data, success: true };
  } catch (error) {
    console.error("Error fetching parkings", error);
    return { error, success: false };
  }
};
