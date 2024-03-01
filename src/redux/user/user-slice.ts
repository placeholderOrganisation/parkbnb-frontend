import { createSlice } from "@reduxjs/toolkit";
import { UserObject } from "../../types/user-types";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "",
      name: "",
      images: [],
      verified: false,
      contactNumber: null,
    },
  },
  reducers: {
    setUserData: (state: { user: UserObject }, action) => {
      const user: UserObject = action.payload;

      state.user.id = user.id;
      state.user.name = user.name;
      state.user.images = user.images;
      state.user.verified = user.verified;
      state.user.contactNumber = user.contactNumber ? user.contactNumber : null;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
