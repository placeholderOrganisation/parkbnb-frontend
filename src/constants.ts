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

export const seoContent = {
  landingPage: {
    pageTitle:
      "Rent A Parking® | Your Parking Marketplace | Parking spots for rent | Car, Boat, RV & Truck Trailer Parking for Rent | Daily/Monthly/Hourly Parking Options",
    pageDescription:
      "Find affordable parking in your neighborhood. Save money as a renter, earn as a host. Trusted by communities across Canada.",
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageCanonicalUrl: `https://${parkingAppDomain}`,
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
    pageDescription: "Earn extra residual income with Rent A Parking®. It's simple. Describe your space, and we'll tell you how much easy money you can earn!",
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageCanonicalUrl: `https://${parkingAppDomain}/create-listing`,
  },
  signUpPage: {
    pageTitle: "Sign Up | Rent A Parking®",
    pageDescription: "Find affordable parking in your neighborhood. Save money as a renter, earn as a host. Trusted by communities across Canada.",
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageCanonicalUrl: `https://${parkingAppDomain}/sign-up`,
  },
  signInPage: {
    pageTitle: "Sign In | Rent A Parking®",
    pageDescription: "Find affordable parking in your neighborhood. Save money as a renter, earn as a host. Trusted by communities across Canada.",
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageCanonicalUrl: `https://${parkingAppDomain}/sign-in`,
  },
  blogsPage: {
    pageTitle: "Blogs | Rent A Parking®",
    pageDescription: "Official blogs from Rent A Parking®. Stay updated with the latest news, tips, and tricks on parking and more.",
    pageImage: `https://${parkingAppDomain}/logo-black.png`,
    pageCanonicalUrl: `https://${parkingAppDomain}/blogs`,
  },
};
