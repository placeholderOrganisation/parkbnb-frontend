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
    isValid: true,
  },
  reducers: {
    setStepOneFormData: (state: StepOneState, action) => {
      const stepOneData: StepOneState = action.payload;

      state.street = stepOneData.street;
      state.city = stepOneData.city;
      state.province = stepOneData.province;
      state.postal = stepOneData.postal;
      state.country = stepOneData.country;
      state.dailyRate = stepOneData.dailyRate;
      state.monthlyRate = stepOneData.monthlyRate;
    },
    setStepOneValidity: (state: StepOneState, action) => {
      state.isValid = action.payload;
    },
  },
});

export const { setStepOneFormData } = stepOneSlice.actions;
export default stepOneSlice.reducer;
