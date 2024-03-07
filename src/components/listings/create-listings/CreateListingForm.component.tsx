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
  const state: RootState = useSelector((state: RootState) => state);

  const isCurrentStepValid = () => {
    switch (activeStep) {
      case 0:
        return state.stepOneForm.isValid;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!isCurrentStepValid()) {
      return;
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <Container component="main" maxWidth="sm">
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </>
          ) : (
            <>
              <Typography component="h1" variant="h4" align="left">
                New listing
              </Typography>
              <MobileStepper
                variant="progress"
                activeStep={activeStep}
                steps={steps.length}
                position="static"
                sx={{ pt: 3 }}
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
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </>
          )}
        </Paper>
        <Copyright />
      </Container>
    </>
  );
};

export default CreateListingForm;
