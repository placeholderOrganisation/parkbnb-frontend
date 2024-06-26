import { createSlice } from "@reduxjs/toolkit";
import { SearchState } from "../types/search.types";
import { Listing, VehicleTypeFilterTypes } from "../types/global.types";
import {
  amenitiesInitialState,
  dimensionsInitialState,
  monthlyPriceInitialState,
  numSpacesFilterInitialState,
  storageTypeInitialState,
  userLocationLatitudeInitialState,
  userLocationLongitudeInitialState,
  vehicleTypeInitialState,
} from "./search-slice.util";
import { parseVehicleTypeReturnSize } from "../utils/parking-utils";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResults: [],
    filteredSearchResults: [],
    userSelectedListing: null,
    listingsRenderedInMap: [],
    fetchedListing: null,
    filters: {
      searchQuery: "",
      amenities: amenitiesInitialState,
      price: monthlyPriceInitialState,
      storageType: storageTypeInitialState,
      vehicleTypes: vehicleTypeInitialState,
      dimensions: dimensionsInitialState,
      numSpaces: numSpacesFilterInitialState,
    },
    userLocation: { latitude: userLocationLatitudeInitialState, longitude: userLocationLongitudeInitialState },
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
    setUserSelectedListingUsingListingId: (state: SearchState, action) => {
      const listingId: string = action.payload;
      const listing: Listing | undefined = state.searchResults.find(
        (listing) => listing._id === listingId
      );

      state.userSelectedListing = listing ? listing : null;
    },
    setListingsRenderedInMap: (state: SearchState, action) => {
      const listings: Listing[] = action.payload;

      state.listingsRenderedInMap = listings;
    },
    setFetchedListing: (state: SearchState, action) => {
      const listing: Listing | null = action.payload;
      state.fetchedListing = listing;
    },
    setSearchQuery: (state: SearchState, action) => {
      // city name
      const searchQuery: string = action.payload.toLowerCase();

      state.filters.searchQuery = searchQuery;
    },
    setUserLocation: (state: SearchState, action) => {
      const location: { latitude: number; longitude: number } = action.payload;
      state.userLocation = location;
    },
    setAmenitiesFilter: (state: SearchState, action) => {
      const updatedAmenities = action.payload;
      state.filters.amenities = updatedAmenities;
    },
    setMonthlyPriceFilter: (state: SearchState, action) => {
      const { minPrice, maxPrice } = action.payload;
      state.filters.price = { monthlyMin: minPrice, monthlyMax: maxPrice };
    },
    setStorageTypeFilter: (state: SearchState, action) => {
      const storageType: string = action.payload;
      state.filters.storageType = storageType;
    },
    setVehicleTypesFilter: (state: SearchState, action) => {
      const vehicleTypes: string = action.payload;
      state.filters.vehicleTypes = vehicleTypes;
    },
    setDimesionsFilter: (state: SearchState, action) => {
      const dimensions: { minLength: number; minWidth: number } =
        action.payload;
      state.filters.dimensions = dimensions;
    },
    setNumSpacesFilter: (state: SearchState, action) => {
      const numSpaces: number = action.payload;
      state.filters.numSpaces = numSpaces;
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

      if (state.filters.amenities.full_day_access) {
        listings = listings.filter(
          (listing) => listing.filters.full_day_access
        );
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

      if (state.filters.storageType) {
        listings = listings.filter(
          (listing) =>
            listing.filters.storage_type === state.filters.storageType
        );
      }

      if (state.filters.vehicleTypes.length > 0) {
        const filteredVehicleTypeSize = parseVehicleTypeReturnSize(
          state.filters.vehicleTypes as keyof VehicleTypeFilterTypes
        );
        listings = listings.filter((listing) => {
          const currentListingVehicleTypeSize = parseVehicleTypeReturnSize(
            listing.filters.vehicle_type
          );
          return currentListingVehicleTypeSize >= filteredVehicleTypeSize;
        });
      }

      if (
        state.filters.dimensions.minLength > 0 &&
        state.filters.dimensions.minWidth > 0
      ) {
        const area =
          state.filters.dimensions.minLength *
          state.filters.dimensions.minWidth;
        listings = listings.filter(
          (listing) => listing.filters.length * listing.filters.width >= area
        );
      }

      if (state.filters.numSpaces > 1) {
        listings = listings.filter(
          (listing) => listing.filters.spaces >= state.filters.numSpaces
        );
      }

      state.filteredSearchResults = listings;
      state.listingsRenderedInMap = listings;
    },
  },
});

export const {
  setSearchResults,
  setUserSelectedListing,
  setUserSelectedListingUsingListingId,
  setSearchQuery,
  setListingsRenderedInMap,
  setFetchedListing,
  filterSearchResults,
  setAmenitiesFilter,
  setMonthlyPriceFilter,
  setStorageTypeFilter,
  setVehicleTypesFilter,
  setDimesionsFilter,
  setNumSpacesFilter,
  setUserLocation,
} = searchSlice.actions;
export default searchSlice.reducer;
