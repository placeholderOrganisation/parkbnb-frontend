import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";
import stepOneFormReducer from "./step-one-slice";

export default configureStore({
  reducer: { user: userReducer, stepOneForm: stepOneFormReducer },
});
