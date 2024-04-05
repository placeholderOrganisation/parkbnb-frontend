import { Listing } from "./global.types";

export interface SearchState {
  searchResults: Listing[] | [];
  filteredSearchResults: Listing[] | [];

  userSelectedListing: Listing | null;
  listingsRenderedInMap: Listing[] | [];
  filters:{
    searchQuery: string | null;
  }
}
