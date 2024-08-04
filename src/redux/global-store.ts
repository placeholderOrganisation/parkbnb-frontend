import { configureStore } from "@reduxjs/toolkit";
import { UserObject } from "../types/user-types";
import {
  StepOneState,
  StepThreeState,
  StepTwoState,
} from "../types/create-listing-form.types";
import { SearchState } from "../types/search.types";
import { MapState } from "./map-slice";

import userReducer from "./user-slice";
import stepOneFormReducer from "./step-one-slice";
import stepTwoFormReducer from "./step-two-slice";
import stepThreeFormReducer from "./step-three-slice";
import searchReducer from "./search-slice";
import mapReducer from "./map-slice";

export interface RootState {
  user: UserObject;
  stepOneForm: StepOneState;
  stepTwoForm: StepTwoState;
  stepThreeForm: StepThreeState;
  search: SearchState;
  map: MapState;
}

export default configureStore({
  reducer: {
    user: userReducer,
    stepOneForm: stepOneFormReducer,
    stepTwoForm: stepTwoFormReducer,
    stepThreeForm: stepThreeFormReducer,
    search: searchReducer,
    map: mapReducer,
  },
});
