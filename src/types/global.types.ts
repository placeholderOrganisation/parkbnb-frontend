export interface Listing {
  id: string;
  filters: {
    security_cameras: boolean;
    "24/7 access": boolean;
    ev_charging: boolean;
    handicap_accessible: boolean;
    storage_type: string;
    vehicle_type: string;
    length: number;
    width: number;
    spaces: number;
  };
  address: {
    street: string;
    lng: string;
    lat: string;
    state: string;
    city: string;
    zip: string;
    country: string;
  };
  description: string;
  price: {
    daily: number;
    monthly: number;
  };
  is_available: boolean;
  images: string[];
  listed_on: string;
  is_scraped: boolean;
  contact: string;
}

export interface ListingOnMap {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: Listing;
}

export interface GetListingsPageProps {
  searchResults: ListingOnMap[];
}

export interface MapComponentProps {
  listings: ListingOnMap[];
  handleListingClick: (listing: ListingOnMap) => void;
  handleMoveEnd: (listings: ListingOnMap[]) => void;
}
