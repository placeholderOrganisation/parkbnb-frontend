import { Dayjs } from "dayjs";

export const MAX_PRICE = 2000;

// need to manually add to search slice filters.
export interface AmenitiesTypeFilterTypes {
  security_cameras: boolean;
  full_day_access: boolean;
  ev_charging: boolean;
  handicap_accessible: boolean;
}

export const FILTER_ENUMS = {
  SECURITY_CAMERAS: "security_cameras",
  FULL_DAY_ACCESS: "full_day_access",
  EV_CHARGING: "ev_charging",
  HANDICAP_ACCESSIBLE: "handicap_accessible",
};

export interface VehicleTypeFilterTypes {
  bike: { label: string; size: number };
  "sedan / suv": { label: string; size: number };
  "pickup truck": { label: string; size: number };
  "boat / RV": { label: string; size: number };
  "commercial truck / trailer": { label: string; size: number };
}

export const VEHICLE_TYPE_ENUMS: VehicleTypeFilterTypes = {
  bike: { label: "bike", size: 1 },
  "sedan / suv": { label: "sedan / suv", size: 2},
  "pickup truck": { label: "pickup truck", size: 3 },
  "boat / RV": { label: "boat / RV", size: 4 },
  "commercial truck / trailer": { label: "commercial truck / trailer", size: 5 },
};

export interface DimensionFilterTypes {
  "length: 20 width: 10": { label: string; length: number; width: number };
  "length: 25 width: 15": { label: string; length: number; width: number };
  "length: 20 width: 20": { label: string; length: number; width: number };
  "length: 40 width: 10": { label: string; length: number; width: number };
  "length: 50 width: 10": { label: string; length: number; width: number };
}

export const DIMENSIONS_ENUMS: DimensionFilterTypes = {
  "length: 20 width: 10": {
    label: "20' x 10' (one car)",
    length: 20,
    width: 10,
  },
  "length: 25 width: 15": {
    label: "25' x 15' (one pickup)",
    length: 25,
    width: 15,
  },
  "length: 20 width: 20": {
    label: "20' x 20' (two cars)",
    length: 20,
    width: 20,
  },
  "length: 40 width: 10": { label: "40' x 10'", length: 40, width: 10 },
  "length: 50 width: 10": { label: "50' x 10'", length: 50, width: 10 },
};

export interface NumSpacesFilterTypes {
  value: number;
  label: string;
}

export const numSpacesOptions: NumSpacesFilterTypes[] = [
  {
    value: 1,
    label: "one or more",
  },
  {
    value: 2,
    label: "two or more",
  },
  {
    value: 3,
    label: "three or more",
  },
];

export interface FilterTypes {
  security_cameras: boolean;
  full_day_access: boolean;
  ev_charging: boolean;
  handicap_accessible: boolean;
  storage_type: string;
  vehicle_type: keyof VehicleTypeFilterTypes;
  length: number;
  width: number;
  spaces: number;
}

export interface Listing {
  _id: string;
  owner_id: string;
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
  listed_on: Dayjs;
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
  searchQuery: string;
  searchResults: ListingOnMap[];
  userSelectedListing: ListingOnMap | null;
  handleMoveEndInMap: (listingIds: string[]) => void;
  handleListingClickInMap: (listingId: string) => void;
}

export interface MapComponentProps {
  city: string;
  listings: ListingOnMap[];
  userSelectedListing: ListingOnMap | null;
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
  logout: () => void;
}

export interface FiltersContainerProps {
  isFilterSectionOpen: boolean;
  handleClosingFilterSection?: () => void;
  handleApplyFilters: () => void;
  handleResetFilters: () => void;
}
