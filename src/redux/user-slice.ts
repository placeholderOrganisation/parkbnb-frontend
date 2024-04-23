import { createSlice } from "@reduxjs/toolkit";
import { initialUserState, UserObject } from "../types/user-types";

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
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
    setUserContactNumber: (state: UserObject, action) => {
      const contactNumber: string = action.payload;
      state.contactNumber = contactNumber;
    },
  },
});

export const { setUserData, setUserContactNumber } = userSlice.actions;
export default userSlice.reducer;
