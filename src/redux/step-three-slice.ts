import { createSlice } from "@reduxjs/toolkit";
import { StepThreeState } from "../types/create-listing-form.types";

export const stepThreeSlice = createSlice({
  name: "step-three",
  initialState: {
    images: [],
    description: "",
    isValid: false,
  },
  reducers: {
    setImages: (state: StepThreeState, action) => {
      const fileUrl: File = action.payload;

      if (fileUrl) {
        state.images.push(action.payload);
      }
    },
    removeImage: (state: StepThreeState, action) => {
      const fileUrl: string = action.payload;
      const updatedImageList = state.images.filter(
        (url) => url !== fileUrl
      );
      if (updatedImageList.length === 0) {
        state.images = [];
      } else {
        state.images = updatedImageList;
      }
    },
    setDescription: (state: StepThreeState, action) => {
      state.description = action.payload;
    },
    setStepThreeValidity: (state: StepThreeState) => {
      state.isValid = state.description.split(" ").length >= 5;
    },
  },
});

export const { setImages, removeImage, setDescription, setStepThreeValidity } = stepThreeSlice.actions;
export default stepThreeSlice.reducer;
