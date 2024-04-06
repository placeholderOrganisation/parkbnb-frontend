// need to manually add to search slice filters.
export interface AmenitiesTypeFilterTypes {
  security_cameras: boolean;
  "24/7 access": boolean;
  ev_charging: boolean;
  handicap_accessible: boolean;
}

export const FILTER_ENUMS = {
  SECURITY_CAMERAS: "security_cameras",
  ACCESS_24_7: "24/7 access",
  EV_CHARGING: "ev_charging",
  HANDICAP_ACCESSIBLE: "handicap_accessible",
};

export interface VehicleTypeFilterTypes {
  bike: string;
  "sedan / suv": string;
  "pickup truck": string;
  "boat / RV": string;
  "commercial truck / trailer": string;
}

export const VEHICLE_TYPE_ENUMS: VehicleTypeFilterTypes = {
  bike: "bike",
  "sedan / suv": "sedan / suv",
  "pickup truck": "pickup truck",
  "boat / RV": "boat / RV",
  "commercial truck / trailer": "commercial truck / trailer",
};

export interface DimensionFilterTypes {
  "length: 20 width: 10": string;
  "length: 25 width: 15": string;
  "length: 20 width: 20": string;
  "length: 40 width: 10": string;
  "length: 50 width: 10": string;
}

export const DIMENSIONS_ENUMS: DimensionFilterTypes = {
  "length: 20 width: 10": "20' x 10' (one car)",
  "length: 25 width: 15": "25' x 15' (one pickup)",
  "length: 20 width: 20": "20' x 20' (two cars)",
  "length: 40 width: 10": "40' x 10'",
  "length: 50 width: 10": "50' x 10'",
};

export interface FilterTypes {
  security_cameras: boolean;
  "24/7 access": boolean;
  ev_charging: boolean;
  handicap_accessible: boolean;
  storage_type: string;
  vehicle_type: keyof VehicleTypeFilterTypes;
  length: number;
  width: number;
  spaces: number;
}

export interface Listing {
  id: string;
  filters: FilterTypes;
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
  handleMoveEndInMap: (listingIds: string[]) => void;
  handleListingClickInMap: (listingId: string) => void;
}

export interface MapComponentProps {
  listings: ListingOnMap[];
  handleListingClick: (listingId: string) => void;
  handleMoveEnd: (listingIds: string[]) => void;
}

export interface NavbarLink {
  name: string;
  path: string;
}

export interface NavbarLayoutProps {
  linksToRender: NavbarLink[];
  handleLogoClick: () => void;
  isUserAuthed: boolean;
}
