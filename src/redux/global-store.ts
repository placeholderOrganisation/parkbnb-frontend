import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user-slice";
import stepOneFormReducer from "./forms/step-one-slice";

export default configureStore({
  reducer: { user: userReducer, stepOneForm: stepOneFormReducer },
});
