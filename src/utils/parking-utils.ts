import {
  DimensionFilterTypes,
  DIMENSIONS_ENUMS,
  FilterTypes,
  Listing,
  ListingOnMap,
  VEHICLE_TYPE_ENUMS,
  VehicleTypeFilterTypes,
} from "../types/global.types";
import dayjs from "dayjs";
import { createParking } from "../api/parking-api";
import {
  StepOneState,
  StepThreeState,
  StepTwoState,
} from "../types/create-listing-form.types";

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
    return "Outdoor storage";
  } else if (storage_type === "indoor") {
    return "Indoor storage";
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

  return VEHICLE_TYPE_ENUMS[vehicle_type];
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
    "24/7 access": amenities["24/7 access"],
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
      "24/7 access": false,
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
