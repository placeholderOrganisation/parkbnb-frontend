import { Listing } from "./global.types";

export interface SearchState {
  searchQuery: string | null;
  userSelectedListing: Listing | null;
  listingsRenderedInMap: Listing[] | [];
}
