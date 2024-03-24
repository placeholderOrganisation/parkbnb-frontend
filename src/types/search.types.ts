import { Listing } from "./global.types";

export interface SearchState {
  searchResults: Listing[] | [];
  filteredSearchResults: Listing[] | [];
  searchQuery: string | null;
  userSelectedListing: Listing | null;
  listingsRenderedInMap: Listing[] | [];
}
