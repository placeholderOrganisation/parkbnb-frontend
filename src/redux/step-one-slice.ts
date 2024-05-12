import { createSlice } from "@reduxjs/toolkit";
import { StepOneState } from "../types/create-listing-form.types";

export const stepOneSlice = createSlice({
  name: "step-one",
  initialState: {
    street: "",
    city: "",
    province: "",
    postal: "",
    country: "",
    dailyRate: 0,
    monthlyRate: 0,
    isValid: false,
  },
  reducers: {
    setStepOneAddressFormData: (state: StepOneState, action) => {
      const stepOneData: StepOneState = action.payload;

      state.street = stepOneData.street;
      state.city = stepOneData.city;
      state.province = stepOneData.province;
      state.postal = stepOneData.postal;
      state.country = stepOneData.country;
    },
    setStepOnePricingFormData: (state: StepOneState, action) => {
      const stepOneData: StepOneState = action.payload;

      state.dailyRate = stepOneData.dailyRate;
      state.monthlyRate = stepOneData.monthlyRate;
    },
    setStepOneValidity: (state: StepOneState) => {
      state.isValid =
        state.street !== "" &&
        state.city !== "" &&
        state.province !== "" &&
        state.postal !== "" &&
        state.country !== "" &&
        state.dailyRate > 0 &&
        state.monthlyRate > 0;
    },
    setStepOneData: (state: StepOneState, action) => {
      const stepOneData: StepOneState = action.payload;

      state.street = stepOneData.street;
      state.city = stepOneData.city;
      state.province = stepOneData.province;
      state.postal = stepOneData.postal;
      state.country = stepOneData.country;
      state.dailyRate = stepOneData.dailyRate;
      state.monthlyRate = stepOneData.monthlyRate;
    },
  },
});

export const {
  setStepOneAddressFormData,
  setStepOnePricingFormData,
  setStepOneValidity,
  setStepOneData,
} = stepOneSlice.actions;
export default stepOneSlice.reducer;
