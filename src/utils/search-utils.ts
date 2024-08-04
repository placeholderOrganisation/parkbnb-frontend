import { addressFields, Listing } from "../types/global.types";

export const fetchSearchSuggestions = (query: string, listings: Listing[]) => {
  let cityResults = listings.filter((listing) =>
    listing.address.city.toLowerCase().includes(query.toLowerCase())
  );

  cityResults = removeDuplicates(cityResults, "city");

  // let addressResults = listings.filter((listing) =>
  //   listing.address.street.toLowerCase().includes(query.toLowerCase())
  // );

  // let postalCodeResults = listings.filter((listing) =>
  //   listing.address.zip.toLowerCase().includes(query.toLowerCase())
  // );

  // return [...cityResults, ...addressResults, ...postalCodeResults];
  return cityResults;
};

export const removeDuplicates = (
  suggestions: Listing[],
  key: keyof addressFields
) => {
  return suggestions.reduce((unique: Listing[], item: Listing) => {
    return unique.findIndex(
      (uItem) =>
        uItem.address[key].toLowerCase() === item.address[key].toLowerCase()
    ) >= 0
      ? unique
      : [...unique, item];
  }, []);
};
