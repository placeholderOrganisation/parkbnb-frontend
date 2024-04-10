import { configureStore } from "@reduxjs/toolkit";
import { UserObject } from "../types/user-types";
import { StepOneState, StepTwoState } from "../types/create-listing-form.types";
import { SearchState } from "../types/search.types";

import userReducer from "./user-slice";
import stepOneFormReducer from "./step-one-slice";
import stepTwoFormReducer from "./step-two-slice";
import searchReducer from "./search-slice";

export interface RootState {
  user: UserObject;
  stepOneForm: StepOneState;
  stepTwoForm: StepTwoState;
  search: SearchState;
}

export default configureStore({
  reducer: {
    user: userReducer,
    stepOneForm: stepOneFormReducer,
    stepTwoForm: stepTwoFormReducer,
    search: searchReducer,
  },
});
