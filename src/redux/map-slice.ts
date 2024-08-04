import { createSlice } from "@reduxjs/toolkit";

export interface MapState {
  lat: number;
  lng: number;
  zoom: number;
}

export const initialMapState: MapState = {
  lat: 43.708266,
  lng: -79.60997,
  zoom: 9,
};

// TODO: fix logout functionality
export const mapSlice = createSlice({
  name: "map",
  initialState: initialMapState,
  reducers: {
    setMapCoords: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.zoom = action.payload.zoom;
    },
    resetMapCoords: (state) => {
      state.lat = initialMapState.lat;
      state.lng = initialMapState.lng;
      state.zoom = initialMapState.zoom;
    },
  },
});

export const { setMapCoords, resetMapCoords } = mapSlice.actions;
export default mapSlice.reducer;
