import { Listing, ListingOnMap } from "../types/global.types";

export const getListingFromResultsGivenId = (
  listingOnMaps: ListingOnMap[],
  id: string
): Listing | null => {
  const listing = listingOnMaps.find(
    (listingOnMap) => listingOnMap.properties.id === id
  );
  if (listing) {
    return convertListingOnMapToListing(listing);
  }
  return null;
};

export const convertListingOnMapToListing = (
  listingOnMap: ListingOnMap
): Listing => {
  const { properties } = listingOnMap;
  return properties;
};
