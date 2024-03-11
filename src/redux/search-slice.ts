import { createSlice } from "@reduxjs/toolkit";
import { SearchState } from "../types/search.types";
import { Listing } from "../types/global.types";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchQuery: null,
    userSelectedListing: null,
  },
  reducers: {
    setUserSelectedListing: (state: SearchState, action) => {
      const listing: Listing = action.payload;

      state.userSelectedListing = listing;
    },
    setSearchQuery: (state: SearchState, action) => {
      const searchQuery: string = action.payload;

      state.searchQuery = searchQuery;
    },
  },
});

export const { setUserSelectedListing, setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
