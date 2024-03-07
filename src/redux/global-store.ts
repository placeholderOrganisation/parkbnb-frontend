import { configureStore } from "@reduxjs/toolkit";
import { UserObject } from "../types/user-types";
import { StepOneState } from "../types/create-listing-form.types";

import userReducer from "./user-slice";
import stepOneFormReducer from "./step-one-slice";

export interface RootState {
  user: UserObject;
  stepOneForm: StepOneState;
}

export default configureStore({
  reducer: { user: userReducer, stepOneForm: stepOneFormReducer },
});
