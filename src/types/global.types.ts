interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  location: string;
}

export interface GetListingsMobilePageProps {
  listings: any[];
}

export interface NavbarHeaderProps {
  signInPageUrl: string;
}
