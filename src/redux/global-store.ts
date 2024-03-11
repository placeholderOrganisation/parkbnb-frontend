import { configureStore } from "@reduxjs/toolkit";
import { UserObject } from "../types/user-types";
import { StepOneState } from "../types/create-listing-form.types";
import { SearchState } from "../types/search.types";

import userReducer from "./user-slice";
import stepOneFormReducer from "./step-one-slice";
import searchReducer from "./search-slice";

export interface RootState {
  user: UserObject;
  stepOneForm: StepOneState;
  search: SearchState;
}

export default configureStore({
  reducer: {
    user: userReducer,
    stepOneForm: stepOneFormReducer,
    search: searchReducer,
  },
});
