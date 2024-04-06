import { createSlice } from "@reduxjs/toolkit";
import { SearchState } from "../types/search.types";
import { Listing } from "../types/global.types";
import {
  amenitiesInitialState,
  monthlyPriceInitialState,
} from "./search-slice.util";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResults: [],
    filteredSearchResults: [],
    userSelectedListing: null,
    listingsRenderedInMap: [],
    filters: {
      searchQuery: "",
      amenities: amenitiesInitialState,
      price: monthlyPriceInitialState,
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
    setAmenitiesFilter: (state: SearchState, action) => {
      const updatedAmenities = action.payload;
      state.filters.amenities = updatedAmenities;
    },
    setMonthlyPriceFilter: (state: SearchState, action) => {
      const { minPrice, maxPrice } = action.payload;
      state.filters.price = { monthlyMin: minPrice, monthlyMax: maxPrice };
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

      const searchQuery: string = state.filters.searchQuery;
      let listings: Listing[] = state.searchResults;

      // filter the search results based on the search query
      if (searchQuery) {
        listings = state.searchResults.filter(
          (listing) => listing.address.city.toLowerCase() === searchQuery
        );
      }

      if (state.filters.amenities["24/7 access"]) {
        listings = listings.filter((listing) => listing.filters["24/7 access"]);
      }

      if (state.filters.amenities.ev_charging) {
        listings = listings.filter((listing) => listing.filters.ev_charging);
      }

      if (state.filters.amenities.security_cameras) {
        listings = listings.filter(
          (listing) => listing.filters.security_cameras
        );
      }

      if (state.filters.amenities.handicap_accessible) {
        listings = listings.filter(
          (listing) => listing.filters.handicap_accessible
        );
      }

      if (state.filters.price.monthlyMin > 0) {
        listings = listings.filter(
          (listing) => listing.price.monthly >= state.filters.price.monthlyMin
        );
      }

      if (state.filters.price.monthlyMax < Number.MAX_VALUE) {
        listings = listings.filter(
          (listing) => listing.price.monthly <= state.filters.price.monthlyMax
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
  setAmenitiesFilter,
  setMonthlyPriceFilter,
} = searchSlice.actions;
export default searchSlice.reducer;
