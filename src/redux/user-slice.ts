import { createSlice } from "@reduxjs/toolkit";
import { UserObject } from "../types/user-types";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    name: "",
    images: [],
    verified: false,
    contactNumber: null,
    isAuthed: false,
  },
  reducers: {
    setUserData: (state: UserObject, action) => {
      const user: UserObject = action.payload;

      state.id = user.id;
      state.name = user.name;
      state.images = user.images;
      state.verified = user.verified;
      state.contactNumber = user.contactNumber ? user.contactNumber : null;
      state.isAuthed = true;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
