import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Button,
  Typography,
  MobileStepper,
} from "@mui/material";
import Review from "./Review";
import AddressForm from "./AddressForm";
import FiltersForm from "./FiltersForm";
import OptionalDetailsForm from "./OptionalDetailsForm";
import Copyright from "../../auth/copyright";
import { steps } from "../../../utils/create-listing-form.utils";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/global-store";
import BottomDrawer from "../../drawers/BottomDrawer";
import PublishListing from "./publish-listing.component";

const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <FiltersForm />;
    case 2:
      return <OptionalDetailsForm />;
    case 3:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
};

const CreateListingForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { stepOneForm, stepTwoForm, stepThreeForm } = useSelector(
    (state: RootState) => state
  );

  const isCurrentStepValid = () => {
    switch (activeStep) {
      case 0:
        return stepOneForm.isValid;
      case 1:
        return stepTwoForm.isValid;
      case 2:
        return stepThreeForm.isValid;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!isCurrentStepValid()) {
      return;
    }
    if (activeStep === steps.length - 1) {
      // open drawer
      setIsSubmitting(true);
      return;
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      {activeStep < steps.length && (
        <Container component="main" maxWidth="sm">
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <>
              <Typography component="h1" variant="h4" align="left">
                New listing
              </Typography>
              <MobileStepper
                variant="progress"
                activeStep={activeStep}
                steps={steps.length}
                position="static"
                sx={{ pt: 3, px: 0 }}
                nextButton={null}
                backButton={null}
                LinearProgressProps={{ sx: { width: "100%" } }}
              />
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                  disabled={!isCurrentStepValid()}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </>
          </Paper>
          <Copyright />
          <BottomDrawer
            open={isSubmitting}
            handleClose={() => {}}
          >
            <PublishListing
              shouldMakeApiCall={isSubmitting}
              stepOneFormData={stepOneForm}
              stepTwoFormData={stepTwoForm}
              stepThreeFormData={stepThreeForm}
            />
          </BottomDrawer>
        </Container>
      )}
    </>
  );
};

export default CreateListingForm;
