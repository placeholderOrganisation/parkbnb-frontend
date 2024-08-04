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
