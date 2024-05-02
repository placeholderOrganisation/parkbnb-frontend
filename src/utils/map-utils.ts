import { Listing } from "../types/global.types";

const defaultZoom = 9;
const cityZoom = 10;
export const cityToCoords = {
  default: {
    lat: 43.708266,
    lng: -79.60997,
    zoom: defaultZoom,
  },
  brampton: {
    lat: 43.7315,
    lng: -79.7624,
    zoom: cityZoom,
  },
  mississauga: {
    lat: 43.589,
    lng: -79.6441,
    zoom: cityZoom,
  },
  toronto: {
    lat: 43.65107,
    lng: -79.457015,
    zoom: cityZoom,
  },
  vaughan: {
    lat: 43.8361,
    lng: -79.4982,
    zoom: cityZoom,
  },
  markham: {
    lat: 43.8561,
    lng: -79.337,
    zoom: cityZoom,
  },
  oakville: {
    lat: 43.4675,
    lng: -79.6877,
    zoom: cityZoom,
  },
};

// getCityCoords returns the coordinates of a city given its name
// if new_listing is not null , return the coordinates of that new_listing
export const getCityCoords = (cityName: string | null) => {
  if (!cityName) {
    return cityToCoords["default"];
  }
  if (Object.keys(cityToCoords).findIndex((city) => city === cityName) === -1) {
    return cityToCoords["default"];
  }
  return cityToCoords[cityName as keyof typeof cityToCoords];
};

export const getListingCoords = (listing: Listing | null) => {
  if (!listing) {
    return getCityCoords("default");
  }

  const parsedLat = parseFloat(listing.address.lat);
  const parsedLng = parseFloat(listing.address.lng);

  return {
    lat: parsedLat,
    lng: parsedLng,
    zoom: cityZoom,
  };
};
