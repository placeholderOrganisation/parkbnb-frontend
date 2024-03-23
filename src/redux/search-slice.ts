import { createSlice } from "@reduxjs/toolkit";
import { SearchState } from "../types/search.types";
import { Listing } from "../types/global.types";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchQuery: null,
    userSelectedListing: null,
    listingsRenderedInMap: [],
  },
  reducers: {
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
  },
});

export const {
  setUserSelectedListing,
  setSearchQuery,
  setListingsRenderedInMap,
} = searchSlice.actions;
export default searchSlice.reducer;
