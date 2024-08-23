import { parkingAppDomain } from "../constants";
import { Listing } from "../types/global.types";
import { getURIParams } from "./browser-utils";
import { parseStorageType } from "./parking-utils";

export const jsonLdDataForListingPage = {
  "@context": "https://schema.org",
  "@type": "ParkingFacility", // or "Place"
  name: "Parking Space in Downtown Toronto",
  description:
    "Affordable parking space available in downtown Toronto. Close to public transport and major attractions.",
  url: "https://rentaparking.ca/listing/12345",
  image: "https://rentaparking.ca/images/parking-downtown-toronto.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Main St",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M5H 2N2",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "43.6532",
    longitude: "-79.3832",
  },
  offers: {
    "@type": "Offer",
    price: "100",
    priceCurrency: "CAD",
    availability: "https://schema.org/InStock",
    url: "https://rentaparking.ca/listing/12345",
  },
  publisher: {
    "@type": "Organization",
    name: "Rent A Parking",
    url: "https://rentaparking.ca",
    logo: "https://rentaparking.ca/logo-black.png",
  },
};

const jsonLdDataForLandingPage = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rent A Parking",
  url: `https://${parkingAppDomain}`,
  description:
    "Find affordable parking in your neighborhood. Save money as a renter, earn as a host. Trusted by communities across Canada.",
  potentialAction: {
    "@type": "SearchAction",
    target: `https://${parkingAppDomain}/listings?q={search_term}`,
    "query-input": "required name=search_term",
  },
};

const jsonLdDataForCreateListingPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Create a Listing - Rent A Parking",
  url: `https://${parkingAppDomain}/create-listing`,
  description:
    "Earn extra income by renting out your unused parking space. Start by creating a listing on Rent A Parking.",
  potentialAction: {
    "@type": "CreateAction",
    target: `https://${parkingAppDomain}/create-listing`,
    result: "New parking listing created",
  },
};

const jsonLdDataForSignInPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Sign In - Rent A Parking",
  url: `https://${parkingAppDomain}/sign-in`,
  description:
    "Easily manage your listings, create a listing, and get access to more features by signing in to Rent A Parking.",
  potentialAction: [
    {
      "@type": "LoginAction",
      target: `https://${parkingAppDomain}/sign-in`,
      result: "User signed in",
    },
    {
      "@type": "AuthorizeAction",
      target: [
        `https://${parkingAppDomain}/api/v1/auth/facebook`,
        `https://${parkingAppDomain}/api/v1/auth/google`,
      ],
      name: "Sign in with Google or Facebook",
    },
  ],
};

const jsonLdDataForSignUpPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Sign Up - Rent A Parking",
  url: `https://${parkingAppDomain}/sign-up`,
  description:
    "Easily manage your listings, create a listing, and get access to more features by signing in to Rent A Parking.",
  potentialAction: [
    {
      "@type": "RegisterAction",
      target: `https://${parkingAppDomain}/sign-up`,
      result: "User signed up",
    },
    {
      "@type": "AuthorizeAction",
      target: [
        `https://${parkingAppDomain}/api/v1/auth/facebook`,
        `https://${parkingAppDomain}/api/v1/auth/google`,
      ],
      name: "Sign up with Google or Facebook",
    },
  ],
};

export const seoContent = {
  landingPage: {
    pageTitle:
      "Rent A Parking® | Your Parking Marketplace | Parking spots for rent | Car, Boat, RV & Truck Trailer Parking for Rent | Daily/Monthly/Hourly Parking Options",
    pageDescription:
      "Find affordable parking in your neighborhood. Save money as a renter, earn as a host. Trusted by communities across Canada.",
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageCanonicalUrl: `https://${parkingAppDomain}`,
    pageJsonLdData: jsonLdDataForLandingPage,
  },
  listingsPage: {
    pageTitle:
      "10 Best Monthly Parking Spots Near Your Area | Rent A Parking® | Your Parking Marketplace",
    pageDescription:
      "Find the cheapest parking on Rent A Parking. Parking reimagined. Rent A Parking offers an easier, safer, cheaper and more convenient parking option. Reserve today!",
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageCanonicalUrl: `https://${parkingAppDomain}/listings`,
  },
  LCO: {
    pageTitle: "Rent A Parking® | Parking Spot Details",
    pageDescription: null,
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageCanonicalUrl: `https://${parkingAppDomain}/listing/:id`,
  },
  createListingPage: {
    pageTitle: "Become a Host | Rent Your Parking With Rent A Parking®",
    pageDescription:
      "Earn extra residual income with Rent A Parking®. It's simple. Describe your space, and we'll tell you how much easy money you can earn!",
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageCanonicalUrl: `https://${parkingAppDomain}/create-listing`,
    pageJsonLdData: jsonLdDataForCreateListingPage,
  },
  signUpPage: {
    pageTitle: "Sign Up | Rent A Parking®",
    pageDescription:
      "Find affordable parking in your neighborhood. Save money as a renter, earn as a host. Trusted by communities across Canada.",
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageCanonicalUrl: `https://${parkingAppDomain}/sign-up`,
    pageJsonLdData: jsonLdDataForSignUpPage,
  },
  signInPage: {
    pageTitle: "Sign In | Rent A Parking®",
    pageDescription:
      "Find affordable parking in your neighborhood. Save money as a renter, earn as a host. Trusted by communities across Canada.",
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageCanonicalUrl: `https://${parkingAppDomain}/sign-in`,
    pageJsonLdData: jsonLdDataForSignInPage,
  },
  blogsPage: {
    pageTitle: "Blogs | Rent A Parking®",
    pageDescription:
      "Official blogs from Rent A Parking®. Stay updated with the latest news, tips, and tricks on parking and more.",
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageCanonicalUrl: `https://${parkingAppDomain}/blogs`,
  },
};

/**
 * Generate SEO for /listings page
 * @returns
 */
export const generateSEOForListingsPage = (
  listings: Listing[] | []
): {
  pageTitle: string;
  pageDescription: string;
  pageJsonLdData: any;
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

  const pageJsonLdData = generateJsonLdForListingsPage(listings);

  return { pageTitle, pageDescription, pageJsonLdData };
};

/**
 * Generate SEO for LCO
 * @param listing
 * @returns
 */
export const generateSEOForIndividualListing = (listing: Listing) => {
  const { address, price, filters } = listing;
  const { daily, monthly } = price;
  const { spaces, vehicle_type, storage_type } = filters;
  const { city, zip } = address;

  const generatedJsonLdData = updateJsonLdDataForIndividualListing(listing);

  const formattedStorageType = parseStorageType(storage_type);
  const pageDescription = `${vehicle_type} Parking in ${city}, ${zip}. ${spaces} spaces available for ${formattedStorageType} parking. $${daily} / day, $${monthly} / month.`;

  return {
    pageTitle: `Rent A Parking® | ${vehicle_type} Parking in ${city}, ${zip} | Parking Spot Details`,
    pageDescription,
    generatedJsonLdData,
  };
};

/**
 * Update the JSON-LD default data for LCO based on the listing data
 * @param listing
 * @returns
 */
const updateJsonLdDataForIndividualListing = (listing: Listing) => {
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

/**
 * Generate ItemList JSON-LD for each listing in /listings page
 * @param listings
 * @returns
 */
export const generateJsonLdForListingsPage = (listings: Listing[]) => {
  const availableListings = listings
    .filter((listing) => listing.is_available)
    .map((listing, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        url: `https://rentaparking.ca/listing/${listing._id}`,
        description: `Parking space in ${listing.address.city}, priced at ${listing.price.monthly} CAD.`,
      },
    }));

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Available Parking Listings - Rent A Parking",
    url: "https://rentaparking.ca/listings",
    description:
      "Explore over 90+ available parking listings. Find affordable parking spaces across Canada.",
    about: {
      "@type": "ItemList",
      itemListElement: availableListings,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `https://${parkingAppDomain}/listings?q={search_term}`,
      "query-input": "required name=search_term",
    },
  };
};
