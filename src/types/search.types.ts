import { AmenitiesTypeFilterTypes, Listing } from "./global.types";

export interface SearchState {
  searchResults: Listing[] | [];
  filteredSearchResults: Listing[] | [];

  userSelectedListing: Listing | null;
  listingsRenderedInMap: Listing[] | [];
  filters: {
    searchQuery: string;
    amenities: AmenitiesTypeFilterTypes;
    price: {
      monthlyMin: number;
      monthlyMax: number;
    };
    storageType: string;
    vehicleTypes: string;
    dimensions: {
      minLength: number;
      minWidth: number;
    };
    numSpaces: number;
  };
}
