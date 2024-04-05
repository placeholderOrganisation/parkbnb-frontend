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
      searchQuery: null
    }
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
      const searchQuery: string = action.payload;

      state.filters.searchQuery = searchQuery;
    },
    setListingsRenderedInMap: (state: SearchState, action) => {
      const listings: Listing[] = action.payload;

      state.listingsRenderedInMap = listings;
    },
    // TODO: delete this function
    filterSearchResultsByCity: (state: SearchState, action) => {
      const cityName: string = action.payload.toLowerCase();
      const listings = state.searchResults.filter(
        (listing) => listing.address.city.toLowerCase() === cityName
      );

      state.filteredSearchResults = listings;
      state.listingsRenderedInMap = listings;
    },
    setFilteredSearchResults: (state: SearchState, action) => {
      const listings: Listing[] = action.payload;

      state.filteredSearchResults = listings;
      state.listingsRenderedInMap = listings;
    },
    resetFilteredSearchResults: (state: SearchState) => {
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
  setFilteredSearchResults,
  resetFilteredSearchResults,
} = searchSlice.actions;
export default searchSlice.reducer;
