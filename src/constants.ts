export const parkingAppDomain = "rentaparking.ca";

export const COMPANY_NAME = "Rent a Parking";

export const shareableMessaBody = `Check out this parking spot on ${COMPANY_NAME}!`;

export const interestMessageBody = `Hi I saw your parking on ${parkingAppDomain} I am interested in renting it! Please let me know if it is available. Thanks!`;

export const footerLists = [
  {
    list: "organization",
    rows: [
      {
        label: "Get started",
        link: "/sign-up",
      },
      {
        label: "Sign in",
        link: "/sign-in",
      },
      {
        label: "Blogs",
        link: "/blogs",
      },
    ],
  },
  {
    list: "parking",
    rows: [
      {
        label: "Rent your parking",
        link: "/create-listing",
      },
      {
        label: "Search parkings",
        link: "/listings",
      },
    ],
  },
  {
    list: "topCities",
    rows: [
      {
        label: "Brampton",
        link: "/listings?city=Brampton",
      },
      {
        label: "Toronto",
        link: "/listings?city=Toronto",
      },
      {
        label: "Mississauga",
        link: "/listings?city=Mississauga",
      },
      {
        label: "Vaughan",
        link: "/listings?city=Vaughan",
      },
    ],
  },
];

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

const jsonLdDateForCreateListingPage = {
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
  listingPage: {
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
    pageJsonLdData: jsonLdDateForCreateListingPage,
  },
  signUpPage: {
    pageTitle: "Sign Up | Rent A Parking®",
    pageDescription:
      "Find affordable parking in your neighborhood. Save money as a renter, earn as a host. Trusted by communities across Canada.",
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageCanonicalUrl: `https://${parkingAppDomain}/sign-up`,
  },
  signInPage: {
    pageTitle: "Sign In | Rent A Parking®",
    pageDescription:
      "Find affordable parking in your neighborhood. Save money as a renter, earn as a host. Trusted by communities across Canada.",
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageCanonicalUrl: `https://${parkingAppDomain}/sign-in`,
  },
  blogsPage: {
    pageTitle: "Blogs | Rent A Parking®",
    pageDescription:
      "Official blogs from Rent A Parking®. Stay updated with the latest news, tips, and tricks on parking and more.",
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageCanonicalUrl: `https://${parkingAppDomain}/blogs`,
  },
};
