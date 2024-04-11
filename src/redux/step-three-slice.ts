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
      const fileToSave: File = action.payload.file;

      const imagesLength = state.images.length;

      if (imagesLength >= 2) {
        state.images = []
      }

      if (fileToSave) {
        state.images.push(action.payload);
      }
    },
    removeImage: (state: StepThreeState, action) => {
      const fileName: string = action.payload;
      const updatedImageList = state.images.filter(
        (file) => file.name !== fileName
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
