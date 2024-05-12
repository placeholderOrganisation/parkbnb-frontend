import { createSlice } from "@reduxjs/toolkit";
import { StepTwoState } from "../types/create-listing-form.types";
import {
  amenitiesInitialState,
  dimensionsInitialState,
  numSpacesFilterInitialState,
  storageTypeInitialState,
  vehicleTypeInitialState,
} from "./search-slice.util";

export const stepTwoSlice = createSlice({
  name: "step-two",
  initialState: {
    amenities: amenitiesInitialState,
    storageType: storageTypeInitialState,
    vehicleTypes: vehicleTypeInitialState,
    dimensions: dimensionsInitialState,
    numSpaces: numSpacesFilterInitialState,
    isValid: false,
  },
  reducers: {
    setAmenities: (state: StepTwoState, action) => {
      const updatedAmenities = action.payload;
      state.amenities = updatedAmenities;
    },
    setStorageType: (state: StepTwoState, action) => {
      const storageType = action.payload;
      state.storageType = storageType;
    },
    setVehicleTypes: (state: StepTwoState, action) => {
      const vehicleTypes = action.payload;
      state.vehicleTypes = vehicleTypes;
    },
    setDimensions: (state: StepTwoState, action) => {
      const dimensions = action.payload;
      state.dimensions = dimensions;
    },
    setNumSpaces: (state: StepTwoState, action) => {
      const numSpaces = action.payload;
      state.numSpaces = numSpaces;
    },
    setStepTwoValidity: (state: StepTwoState) => {
      state.isValid =
        state.storageType !== "" &&
        state.vehicleTypes.length > 0 &&
        state.dimensions.minLength > 0 &&
        state.dimensions.minWidth > 0;
    },
    setStepTwoData: (state: StepTwoState, action) => {
      const stepTwoData: StepTwoState = action.payload;

      state.amenities = stepTwoData.amenities;
      state.storageType = stepTwoData.storageType;
      state.vehicleTypes = stepTwoData.vehicleTypes;
      state.dimensions = stepTwoData.dimensions;
      state.numSpaces = stepTwoData.numSpaces;
    },
  },
});

export const {
  setAmenities,
  setStorageType,
  setVehicleTypes,
  setDimensions,
  setNumSpaces,
  setStepTwoValidity,
  setStepTwoData,
} = stepTwoSlice.actions;
export default stepTwoSlice.reducer;
