import { configureStore } from "@reduxjs/toolkit";
import { UserObject } from "../types/user-types";
import { StepOneState, StepThreeState, StepTwoState } from "../types/create-listing-form.types";
import { SearchState } from "../types/search.types";
import { AuthObject } from "../types/auth-state.types";

import userReducer from "./user-slice";
import stepOneFormReducer from "./step-one-slice";
import stepTwoFormReducer from "./step-two-slice";
import stepThreeFormReducer from "./step-three-slice";
import searchReducer from "./search-slice";
import authReducer from "./auth-slice";

export interface RootState {
  user: UserObject;
  stepOneForm: StepOneState;
  stepTwoForm: StepTwoState;
  stepThreeForm: StepThreeState;
  search: SearchState;
  auth: AuthObject;
}

export default configureStore({
  reducer: {
    user: userReducer,
    stepOneForm: stepOneFormReducer,
    stepTwoForm: stepTwoFormReducer,
    stepThreeForm: stepThreeFormReducer,
    search: searchReducer,
    auth: authReducer,
  },
});
