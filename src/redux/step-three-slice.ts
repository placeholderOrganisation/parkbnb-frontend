import { createSlice } from "@reduxjs/toolkit";
import { StepThreeState } from "../types/create-listing-form.types";

export const stepThreeSlice = createSlice({
  name: "step-three",
  initialState: {
    images: [],
    description: "",
    isValid: true,
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
    setIsValid: (state: StepThreeState, action) => {
      state.isValid = action.payload;
    },
  },
});

export const { setImages, removeImage, setDescription, setIsValid } = stepThreeSlice.actions;
export default stepThreeSlice.reducer;
