import { createSlice } from "@reduxjs/toolkit";
import { SearchState } from "../types/search.types";
import { Listing } from "../types/global.types";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResults: [],
    filteredSearchResults: [],
    searchQuery: null,
    userSelectedListing: null,
    listingsRenderedInMap: [],
  },
  reducers: {
    setSearchResults: (state: SearchState, action) => {
      const listings: Listing[] = action.payload;

      state.searchResults = listings;
      state.filteredSearchResults = listings;
      state.listingsRenderedInMap = listings;
    },
    setUserSelectedListing: (state: SearchState, action) => {
      const listing: Listing | null = action.payload;

      state.userSelectedListing = listing;
    },
    setSearchQuery: (state: SearchState, action) => {
      // city name
      const searchQuery: string = action.payload;

      state.searchQuery = searchQuery;
    },
    setListingsRenderedInMap: (state: SearchState, action) => {
      const listings: Listing[] = action.payload;

      state.listingsRenderedInMap = listings;
    },
    filterSearchResultsByCity: (state: SearchState, action) => {
      const cityName: string = action.payload.toLowerCase();
      const listings = state.searchResults.filter(
        (listing) => listing.address.city.toLowerCase() === cityName
      );

      state.filteredSearchResults = listings;
      state.listingsRenderedInMap = listings;
    },
    resetFilters: (state: SearchState) => {
      const listings = state.searchResults;
      state.filteredSearchResults = listings;
      state.listingsRenderedInMap = listings;
    },
  },
});

export const {
  setSearchResults,
  setUserSelectedListing,
  setSearchQuery,
  setListingsRenderedInMap,
  filterSearchResultsByCity,
  resetFilters,
} = searchSlice.actions;
export default searchSlice.reducer;
