import { jsonLdDataForListingPage, parkingAppDomain } from "../constants";
import { Listing } from "../types/global.types";
import { getURIParams } from "./browser-utils";
import { parseStorageType } from "./parking-utils";

export const generateSEOForListingPage = (): {
  pageTitle: string;
  pageDescription: string;
} => {
  const uriParams = getURIParams();
  const { city, address, postalCode } = uriParams;
  let pageTitle =
    "10 Best Monthly Parking Spots Near Your Area | Rent A Parking® | Your Parking Marketplace";
  let pageDescription =
    "Find the cheapest parking on Rent A Parking. Parking reimagined. Rent A Parking offers an easier, safer, cheaper and more convenient parking option. Reserve today!";
  if (city) {
    pageTitle = `Rent A Parking® | 10 Best Monthly Parking Spots in ${city} | Your Parking Marketplace`;
    pageDescription = `Find the cheapest parking on Rent A Parking in ${city}. Parking reimagined. Rent A Parking offers an easier, safer, cheaper and more convenient parking options in ${city}. Reserve today!`;
  } else if (address) {
    pageTitle = `Rent A Parking® | Parking Spot near ${address} | Your Parking Marketplace`;
    pageDescription = `Find the cheapest parking on Rent A Parking near ${address}. Parking reimagined. Rent A Parking offers an easier, safer, cheaper and more convenient parking options near ${address}. Reserve today!`;
  } else if (postalCode) {
    pageTitle = `Rent A Parking® | Parking Spot near ${postalCode} | Your Parking Marketplace`;
    pageDescription = `Find the cheapest parking on Rent A Parking near ${postalCode}. Parking reimagined. Rent A Parking offers an easier, safer, cheaper and more convenient parking options near ${postalCode}. Reserve today!`;
  }
  return { pageTitle, pageDescription };
};

export const generatePageDescriptionUsingListing = (listing: Listing) => {
  const { address, price, filters } = listing;
  const { daily, monthly } = price;
  const { spaces, vehicle_type, storage_type } = filters;
  const { city, zip } = address;

  const generatedJsonLdData = updateJsonLdDataForListing(listing);

  const formattedStorageType = parseStorageType(storage_type);
  const pageDescription = `${vehicle_type} Parking in ${city}, ${zip}. ${spaces} spaces available for ${formattedStorageType} parking. $${daily} / day, $${monthly} / month.`;

  return {
    pageTitle: `Rent A Parking® | ${vehicle_type} Parking in ${city}, ${zip} | Parking Spot Details`,
    pageDescription,
    generatedJsonLdData,
  };
};

const updateJsonLdDataForListing = (listing: Listing) => {
  const { address, price, filters, description, _id, images } = listing;
  const { daily, monthly } = price;
  const { spaces, vehicle_type, storage_type } = filters;
  const { city, zip, street, lat, lng } = address;

  const jsonLdForListing = jsonLdDataForListingPage;
  const formattedStorageType = parseStorageType(storage_type);

  jsonLdForListing["name"] = `${vehicle_type} Parking in ${city}, ${zip}`;
  jsonLdForListing["description"] =
    description ||
    `${vehicle_type} Parking in ${city}, ${zip}. ${spaces} spaces available for ${formattedStorageType} parking. $${daily} / day, $${monthly} / month.`;

  jsonLdForListing["url"] = `https://${parkingAppDomain}/listing/${_id}`;
  jsonLdForListing["image"] = (images && images.length > 1 && images[0]) || "";

  jsonLdForListing["offers"]["price"] = monthly.toString();
  jsonLdForListing["offers"][
    "url"
  ] = `https://${parkingAppDomain}/listing/${_id}`;

  jsonLdForListing["address"]["addressLocality"] = city;
  jsonLdForListing["address"]["postalCode"] = zip;
  jsonLdForListing["address"]["streetAddress"] = street;
  jsonLdForListing["geo"]["latitude"] = lat;
  jsonLdForListing["geo"]["longitude"] = lng;

  return jsonLdForListing;
};
