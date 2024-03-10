interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  location: string;
}

interface GetListingsMobilePageProps {
  listings: any[];
}
