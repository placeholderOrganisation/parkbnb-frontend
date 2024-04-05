import { createSlice } from "@reduxjs/toolkit";
import { SearchState } from "../types/search.types";
import { Listing } from "../types/global.types";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResults: [],
    filteredSearchResults: [],
    userSelectedListing: null,
    listingsRenderedInMap: [],
    filters: {
      searchQuery: "",
    },
  },
  reducers: {
    // this function should only be invoked once when get-listings page mounts
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
      const searchQuery: string = action.payload.toLowerCase();

      state.filters.searchQuery = searchQuery;
    },
    setListingsRenderedInMap: (state: SearchState, action) => {
      const listings: Listing[] = action.payload;

      state.listingsRenderedInMap = listings;
    },
    /**
     * There are 2 scenarios where this function is called
     * 1. when user resets the search query
     * 2. when user resets the filters
     *
     *
     * In both scenarios, we need to reset the filteredSearchResults to the searchResults
     * In the first scenario, we need to apply the filters
     * In the second scenario, we need to filter based on the searchQuery
     *
     */
    filterSearchResultsBySearchQuery: (state: SearchState) => {
      const cityName: string = state.filters.searchQuery;

      const listings = state.searchResults.filter(
        (listing) => listing.address.city.toLowerCase() === cityName
      );

      state.filteredSearchResults = listings;
      state.listingsRenderedInMap = listings;
    },
    resetSearchResultsBySearchQuery: (state: SearchState) => {
      const listings = state.searchResults;

      // TODO: get applied filter and filter state.searchResults
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
  filterSearchResultsBySearchQuery,
  resetSearchResultsBySearchQuery,
} = searchSlice.actions;
export default searchSlice.reducer;
