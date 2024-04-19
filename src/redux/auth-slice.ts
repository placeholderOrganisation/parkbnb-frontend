import { createSlice } from "@reduxjs/toolkit";
import { AuthObject } from "../types/auth-state.types";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    redirect_to: "/",
  },
  reducers: {
    setRedirectDestinationAfterAuth: (state: AuthObject, action) => {
      const redirect_to: string = action.payload;

      state.redirect_to = redirect_to;
    },
  },
});

export const { setRedirectDestinationAfterAuth } = authSlice.actions;
export default authSlice.reducer;
