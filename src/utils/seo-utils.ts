import { parkingAppDomain } from "../constants";
import { Listing } from "../types/global.types";
import { getURIParams } from "./browser-utils";
import { formatPostalCode } from "./parking-utils";

const defaultSEOContentForEachPage = {
  landingPage: {
    title: "Rent A Parking® | Your Parking Marketplace",
    description:
      "Find affordable monthly parking near you. Save money as a renter, earn as a host. Trusted by communities across Canada.",
    url: `https://${parkingAppDomain}`,
  },
  /**
   * SEO content for /listings page is generated dynamically
   */
  listingsPage: {
    title:
      "10 Best Monthly Parking Spots Near Your Area | Rent A Parking® | Your Parking Marketplace",
    description:
      "Discover convenient and affordable monthly parking near you. Secure your monthly parking today and enjoy hassle-free parking every month.",
    url: `https://${parkingAppDomain}/listings`,
  },
  /**
   * SEO content for LCO page is generated dynamically
   */
  LCO: {
    title: "Rent A Parking® | Parking Spot Details",
    description: null,
    url: `https://${parkingAppDomain}/listing/:id`,
  },
  createListingPage: {
    title: "Become a Host | Rent Your Parking With Rent A Parking®",
    description:
      "Earn extra residual income with Rent A Parking®. It's simple. Describe your space, and we'll tell you how much easy money you can earn!",
    url: `https://${parkingAppDomain}/create-listing`,
  },
  signUpPage: {
    title: "Sign Up | Rent A Parking®",
    description:
      "Find affordable monthly parking near you. Save money as a renter, earn as a host. Trusted by communities across Canada.",
    url: `https://${parkingAppDomain}/sign-up`,
  },
  signInPage: {
    title: "Sign In | Rent A Parking®",
    description:
      "Find affordable monthly parking near you. Save money as a renter, earn as a host. Trusted by communities across Canada.",
    url: `https://${parkingAppDomain}/sign-in`,
  },
  blogsPage: {
    title: "Blogs | Rent A Parking®",
    description:
      "Official blogs from Rent A Parking®. Stay updated with the latest news, tips, and tricks on parking and more.",
    url: `https://${parkingAppDomain}/blogs`,
  },
};

/**
 * Skeleton JSON-LD data for a listing
 * This data is updated dynamically based on the listings data in updateJsonLdDataForIndividualListing
 */
export const defaultJsonLdDataForListing = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: `Parking Space Near Your Area`,
  title: `Parking Space Near Your Area`,
  description: `Parking space in Your Area, priced at 50 CAD.`,
  image: "listing.images[0]", // Assuming you have at least one image
  url: "https://rentaparking.ca/listing/:id",
  offers: {
    "@type": "Offer",
    url: "https://rentaparking.ca/listing/:id",
    priceCurrency: "CAD",
    price: "50",
    priceValidUntil: "2050-01-01",
    itemCondition: "https://schema.org/NewCondition",
    availability: true
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
  },
  review: {
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: 4.4,
      bestRating: 5,
    },
    author: {
      "@type": "Organization",
      name: "Rent A Parking®",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.7,
    reviewCount: 100,
  },
};

/**
 * Skeleton JSON-LD data for /listings page
 * This data is updated dynamically based on the listings data in updateJsonLdDataForListingsPage
 */
const jsonLdDataForListingsPage = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name:
    "10 Best Monthly Parking Spots Near Your Area | Rent A Parking® | Your Parking Marketplace",
  url: `https://${parkingAppDomain}/listings`,
  description:
    "Find the cheapest parking on Rent A Parking. Parking reimagined. Rent A Parking offers an easier, safer, cheaper and more convenient parking option. Reserve today!",
  potentialAction: {
    "@type": "SearchAction",
    target: `https://${parkingAppDomain}/listings?q={search_term}`,
    "query-input": "required name=search_term",
  },
};

/**
 * Skeleton JSON-LD data for /listings page
 * This data is updated dynamically based on the listings data in generateJsonLdForLCO
 */
const jsonLdDataForLCO = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rent A Parking® | Parking Spot Details",
  description: "",
  url: `https://${parkingAppDomain}/listing/:id`,
};

const jsonLdDataForLandingPage = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: defaultSEOContentForEachPage.landingPage.title,
    url: defaultSEOContentForEachPage.landingPage.url,
    description: defaultSEOContentForEachPage.landingPage.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `https://${parkingAppDomain}/listings?q={search_term}`,
      "query-input": "required name=search_term",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: "Breadcrumb List For Rent A Parking",
    description: "Breadcrumb List For Rent A Parking's landing page",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": defaultSEOContentForEachPage.landingPage.url,
          name: defaultSEOContentForEachPage.landingPage.title,
        },
      },
    ],
  },
];

const jsonLdDataForCreateListingPage = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: defaultSEOContentForEachPage.createListingPage.title,
    url: defaultSEOContentForEachPage.createListingPage.url,
    description: defaultSEOContentForEachPage.createListingPage.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: defaultSEOContentForEachPage.createListingPage.title,
    description: "Breadcrumb List For Rent A Parking's Create Listing Page",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": defaultSEOContentForEachPage.landingPage.url,
          name: defaultSEOContentForEachPage.landingPage.title,
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": defaultSEOContentForEachPage.createListingPage.url,
          name: "create-listing",
        },
      },
    ],
  },
];

const jsonLdDataForSignInPage = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: defaultSEOContentForEachPage.signInPage.title,
    url: defaultSEOContentForEachPage.signInPage.url,
    description: defaultSEOContentForEachPage.signInPage.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: "Breadcrumb List For Sign In Page",
    description: "Breadcrumb List For Rent A Parking's Sign In Page",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": defaultSEOContentForEachPage.landingPage.url,
          name: defaultSEOContentForEachPage.landingPage.title,
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": defaultSEOContentForEachPage.signInPage.url,
          name: defaultSEOContentForEachPage.signInPage.title,
        },
      },
    ],
  },
];

const jsonLdDataForSignUpPage = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: defaultSEOContentForEachPage.signUpPage.title,
    url: defaultSEOContentForEachPage.signUpPage.url,
    description: defaultSEOContentForEachPage.signUpPage.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: "Breadcrumb List For Sign Up Page",
    description: "Breadcrumb List For Rent A Parking's Sign Up Page",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": defaultSEOContentForEachPage.landingPage.url,
          name: defaultSEOContentForEachPage.landingPage.title,
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": defaultSEOContentForEachPage.signUpPage.url,
          name: defaultSEOContentForEachPage.signUpPage.title,
        },
      },
    ],
  },
];

export const seoContent = {
  landingPage: {
    pageTitle: defaultSEOContentForEachPage.landingPage.title,
    pageDescription: defaultSEOContentForEachPage.landingPage.description,
    pageCanonicalUrl: defaultJsonLdDataForListing.url,
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageJsonLdData: jsonLdDataForLandingPage,
  },
  listingsPage: {
    pageTitle: defaultSEOContentForEachPage.listingsPage.title,
    pageDescription: defaultSEOContentForEachPage.listingsPage.description,
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
    pageTitle: defaultSEOContentForEachPage.createListingPage.title,
    pageDescription: defaultSEOContentForEachPage.createListingPage.description,
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageCanonicalUrl: defaultSEOContentForEachPage.createListingPage.url,
    pageJsonLdData: jsonLdDataForCreateListingPage,
  },
  signUpPage: {
    pageTitle: defaultSEOContentForEachPage.signUpPage.title,
    pageDescription: defaultSEOContentForEachPage.signUpPage.description,
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageCanonicalUrl: defaultSEOContentForEachPage.signUpPage.url,
    pageJsonLdData: jsonLdDataForSignUpPage,
  },
  signInPage: {
    pageTitle: defaultSEOContentForEachPage.signInPage.title,
    pageDescription: defaultSEOContentForEachPage.signInPage.description,
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageCanonicalUrl: defaultSEOContentForEachPage.signInPage.url,
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
  pageImage: string;
  pageCanonicalUrl: string;
} => {
  const uriParams = getURIParams();
  const { city, address, postalCode, q } = uriParams;
  const pageImage = generateImageForListingsPage();
  const pageCanonicalUrl = generateCanonicalUrlForListingsPage();

  let pageTitle = defaultSEOContentForEachPage.listingsPage.title;
  let pageDescription = defaultSEOContentForEachPage.listingsPage.description;
  let listingDescriptions = generateListingDescriptionsForListingsPage(
    listings
  );

  if (city) {
    const capitalizedCity = capitalizedString(city);
    pageTitle = `10 Best Monthly Parking in ${capitalizedCity} |  Rent A Parking® | Your Parking Marketplace`;
    pageDescription = `Daily, Monthly parkings in ${capitalizedCity} · ${listingDescriptions}`;
  } else if (address) {
    pageTitle = `Parking Spot near ${address} | Rent A Parking® | Your Parking Marketplace`;
    pageDescription = `Daily, Monthly parkings near ${address} · ${listingDescriptions}`;
  } else if (postalCode) {
    pageTitle = `Parking Spot near ${postalCode} | Rent A Parking® | Your Parking Marketplace`;
    pageDescription = `Daily, Monthly parkings near ${postalCode} · ${listingDescriptions}`;
  } else if (q) {
    pageTitle = `Parking Spot near ${q} | Rent A Parking® | Your Parking Marketplace`;
    pageDescription = `Daily, Monthly parkings near ${q} · ${listingDescriptions}`;
  }

  const pageJsonLdData = generateJsonLdForListingsPage(
    listings,
    pageTitle,
    pageDescription,
    pageCanonicalUrl,
    pageImage
  );

  return {
    pageTitle,
    pageDescription,
    pageImage,
    pageCanonicalUrl,
    pageJsonLdData,
  };
};

export const generateCanonicalUrlForListingsPage = (): string => {
  const uriParams = getURIParams();
  const { city, address, postalCode, q } = uriParams;

  if (city) {
    return `https://${parkingAppDomain}/listings?city=${city}`;
  } else if (address) {
    return `https://${parkingAppDomain}/listings?address=${address}`;
  } else if (postalCode) {
    return `https://${parkingAppDomain}/listings?postalCode=${postalCode}`;
  } else if (q) {
    return `https://${parkingAppDomain}/listings?q=${q}`;
  }

  return defaultSEOContentForEachPage.listingsPage.url;
};

/**
 * Generate SEO for LCO
 * @param listing
 * @returns
 */
export const generateSEOForIndividualListing = (
  listing: Listing
): {
  pageTitle: string;
  pageDescription: string;
  pageJsonLdData: any;
  pageImage: string;
  pageCanonicalUrl: string;
} => {
  const { _id, address, price, images } = listing;
  const { daily, monthly } = price;
  const { city } = address;

  const capitalizedCity = capitalizedString(city);
  const imageObjectContentUrl =
    images && images.length > 0 && images[0] !== ""
      ? images[0]
      : getImgForCity(city);

  const pageTitle = `$${daily}/day, $${monthly}/month parking in ${capitalizedCity} | Parking Spot Details | Rent A Parking®`;
  const pageDescription = generatePageDescriptionUsingListing(listing);
  const pageCanonicalUrl = `https://${parkingAppDomain}/listing/${_id}`;

  const pageJsonLdData = generateJsonLdForLCO(
    listing,
    pageTitle,
    pageDescription,
    pageCanonicalUrl,
    imageObjectContentUrl
  );

  return {
    pageTitle,
    pageDescription,
    pageJsonLdData,
    pageImage: imageObjectContentUrl,
    pageCanonicalUrl: pageCanonicalUrl,
  };
};

const generateJsonLdForLCO = (
  listing: Listing,
  pageTitle: string,
  pageDescription: string,
  pageCanonicalUrl: string,
  pageImage: string
) => {
  const productJsonLdData = updateJsonLdDataForIndividualListing(listing);

  const jsonLdDataForLCOPage = {
    ...jsonLdDataForLCO,
  };

  jsonLdDataForLCOPage["name"] = pageTitle;
  jsonLdDataForLCOPage["description"] = pageDescription;
  jsonLdDataForLCOPage["url"] = pageCanonicalUrl;

  const breadCrumbObject = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: "Breadcrumb List For Individual Listing Page",
    description:
      "Breadcrumb List For Individual Listing Page for Rent A Parking",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": `https://${parkingAppDomain}`,
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `https://${parkingAppDomain}/listings`,
          name: "Listings",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@id": pageCanonicalUrl,
          name: `Listing Details`,
        },
      },
    ],
  };

  const imageObject = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: pageImage,
    creditText: "Rent A Parking",
  };

  return [
    productJsonLdData,
    jsonLdDataForLCOPage,
    breadCrumbObject,
    imageObject,
  ];
};

/**
 * Update the JSON-LD default data for LCO based on the listing data
 * @param listing
 * @returns
 */
const updateJsonLdDataForIndividualListing = (listing: Listing) => {
  const { address, price, filters, _id, images } = listing;
  const { daily, monthly } = price;
  const { spaces, storage_type } = filters;
  const { city, zip } = address;

  const capitalizedCity = capitalizedString(city);
  const formattedZip = formatPostalCode(zip);

  const jsonLdForListing = {
    ...defaultJsonLdDataForListing, // Shallow copy of the defaultJsonLdDataForListing
    offers: { ...defaultJsonLdDataForListing.offers }, // Deep copy for offers to avoid reference issues
  };

  let parsedHeading = `${spaces} ${storage_type} parking in ${capitalizedCity}, $${monthly} / month`;
  if (spaces > 1) {
    parsedHeading = `${spaces} ${storage_type} parking in ${capitalizedCity}, $${monthly} / month`;
  }

  jsonLdForListing["name"] = parsedHeading;
  jsonLdForListing["title"] = parsedHeading;
  jsonLdForListing[
    "description"
  ] = `$${daily}/day, $${monthly}/month parking in ${formattedZip}`;

  jsonLdForListing["image"] =
    (images && images.length > 0 && images[0]) ||
    "https://res.cloudinary.com/dvkw3ivfp/image/upload/v1713666013/default-fallback-image_fs8zd7.png";
  jsonLdForListing["url"] = `https://${parkingAppDomain}/listing/${_id}`;

  jsonLdForListing["offers"]["price"] = monthly.toString();
  jsonLdForListing["offers"][
    "url"
  ] = `https://${parkingAppDomain}/listing/${_id}`;

  jsonLdForListing["review"]["author"]["name"] = "Rent A Parking";

  return jsonLdForListing;
};

const generatePageDescriptionUsingListing = (listing: Listing) => {
  const { address, price } = listing;
  const { monthly } = price;
  const { zip } = address;

  const formattedZip = formatPostalCode(zip);

  return `$${monthly}/month parking near ${formattedZip}`;
};

/**
 * Generate ItemList JSON-LD for each listing in /listings page
 * @param listings
 * @returns
 */
export const generateJsonLdForListingsPage = (
  listings: Listing[],
  pageTitle: string,
  pageDescription: string,
  pageCanonicalUrl: string,
  pageImage: string
) => {
  const itemListElement = listings
    .filter((listing) => listing.is_available)
    .map((listing, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: updateJsonLdDataForIndividualListing(listing),
    }));

  const jsonLdForListingsPage = {
    ...jsonLdDataForListingsPage, // Shallow copy of the defaultJsonLdDataForListing
  };

  jsonLdForListingsPage["name"] = pageTitle;
  jsonLdForListingsPage["description"] = pageDescription;
  jsonLdForListingsPage["url"] = pageCanonicalUrl;

  const breadCrumbObject = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: "Breadcrumb List For Listings Page - Rent A Parking",
    description: "Breadcrumb list for the listings page of Rent A Parking",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": `https://${parkingAppDomain}`,
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `https://${parkingAppDomain}/listings`,
          name: "Listings",
        },
      },
    ],
  };

  const imageObject = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: pageImage,
    creditText: "Rent A Parking",
    creator: {
      "@type": "Organization",
      name: "Rent A Parking",
    },
    copyrightNotice: "Rent A Parking",
    license: `https://${parkingAppDomain}`,
    acquireLicensePage: `https://${parkingAppDomain}`,
  };

  return [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Available Parking Listings - Rent A Parking",
      description:
        "Explore over 90+ available parking listings. Find affordable parking spaces across Canada.",
      url: `https://${parkingAppDomain}/listings`,
      itemListElement: itemListElement,
    },
    breadCrumbObject,
    imageObject,
    jsonLdForListingsPage,
  ];
};

const generateListingDescriptionsForListingsPage = (
  listings: Listing[]
): string => {
  if (!listings || listings.length === 0) return "";
  const descriptions = listings
    .filter((listing) => listing.is_available)
    .map((listing) => ({
      description: generatePageDescriptionUsingListing(listing),
    }));

  const description = descriptions
    .map((listing) => listing.description)
    .join(" · ");

  return description;
};

const generateImageForListingsPage = (): string => {
  const uriParams = getURIParams();
  const { city } = uriParams;
  return getImgForCity(city || "default");
};

export const getImgForCity = (city: string) => {
  if (!city)
    return "https://res.cloudinary.com/dvkw3ivfp/image/upload/v1713666013/default-fallback-image_fs8zd7.png";

  const cityLowerCased = city.toLowerCase();
  switch (cityLowerCased) {
    case "brampton":
      return "https://www.teamarora.com/wp-content/uploads/2022/06/Brampton-downtown.jpg";
    case "toronto":
      return "https://media.cntraveler.com/photos/5b2be6938b842c3b35c5d30c/16:9/w_1280,c_limit/Toronto_getty-Images_748610951.jpg";
    case "mississauga":
      return "https://www.ontarioconstructionnews.com/wp-content/uploads/2023/11/mississauga.jpg";
    case "vaughan":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Vaughan_Metropolitan_Centre_aerial_view_2022.jpg/800px-Vaughan_Metropolitan_Centre_aerial_view_2022.jpg";
    default:
      return "https://res.cloudinary.com/dvkw3ivfp/image/upload/v1713666013/default-fallback-image_fs8zd7.png";
  }
};

export const capitalizedString = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
