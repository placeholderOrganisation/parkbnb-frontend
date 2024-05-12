import {
  StepOneState,
  StepThreeState,
  StepTwoState,
} from "../types/create-listing-form.types";

// steps in the create listing form
export const steps = ["Address", "Filters", "Optional details", "Review"];

export const saveFormToLocalStorage = (
  stepOneFormData: StepOneState,
  stepTwoFormData: StepTwoState,
  stepThreeFormData: StepThreeState
) => {
  localStorage.setItem("stepOneFormData", JSON.stringify(stepOneFormData));
  localStorage.setItem("stepTwoFormData", JSON.stringify(stepTwoFormData));
  localStorage.setItem("stepThreeFormData", JSON.stringify(stepThreeFormData));
};

export const getFormStateFromLocalStorage = () => {
  const stepOneFormData = JSON.parse(
    localStorage.getItem("stepOneFormData") || "{}"
  );
  const stepTwoFormData = JSON.parse(
    localStorage.getItem("stepTwoFormData") || "{}"
  );
  const stepThreeFormData = JSON.parse(
    localStorage.getItem("stepThreeFormData") || "{}"
  );
  return { stepOneFormData, stepTwoFormData, stepThreeFormData };
};
