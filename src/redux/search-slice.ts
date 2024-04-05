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
    setListingsRenderedInMap: (state: SearchState, action) => {
      const listings: Listing[] = action.payload;

      state.listingsRenderedInMap = listings;
    },
    setSearchQuery: (state: SearchState, action) => {
      // city name
      const searchQuery: string = action.payload.toLowerCase();

      state.filters.searchQuery = searchQuery;
    },
    /**
     * There are 4 scenarios to handle for filtering the search results:
     * 1. when user resets the search query
     * 2. when user resets the filters
     * 4. when user types in the search query
     * 3. when user applies the filters
     *
     *
     * In both scenarios, we need to reset the filteredSearchResults to the searchResults
     * In the first scenario, we need to apply the filters
     * In the second scenario, we need to filter based on the searchQuery
     *
     * I solved the above problem by creating 1 function for
     * filtering search results. I call this functions as follows
     *
     * If the user resets the search query, the following functions are called:
     * 1. setSearchQuery("")
     * 2. filterSearchResults
     *
     * If the user resets the filters, the following functions are called:
     * 1. setFilters({})
     * 2. filterSearchResults
     *
     * If the user types in the search query, the following functions are called:
     * 1. setSearchQuery("city name")
     * 2. filterSearchResults
     *
     * If the user applies the filters, the following functions are called:
     * 1. setFilters({filters})
     * 2. filterSearchResults
     */
    filterSearchResults: (state: SearchState) => {
      // assumes that the search query is already set correctly in the state

      const cityName: string = state.filters.searchQuery;
      let listings: Listing[] = state.searchResults;

      // filter the search results based on the search query
      if (cityName) {
        listings = state.searchResults.filter(
          (listing) => listing.address.city.toLowerCase() === cityName
        );
      }

      // TODO: filter the search results based on the filters

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
  filterSearchResults,
} = searchSlice.actions;
export default searchSlice.reducer;
