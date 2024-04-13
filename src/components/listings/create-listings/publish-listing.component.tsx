import { CircularProgress, Stack, Typography } from "@mui/material";
import {
  StepOneState,
  StepThreeState,
  StepTwoState,
} from "../../../types/create-listing-form.types";
import { handleGeocode } from "../../../utils/geo-coding.utils";
import { useEffect } from "react";

interface PublishListingProps {
  shouldMakeApiCall: boolean;
  stepOneFormData: StepOneState;
  stepTwoFormData: StepTwoState;
  stepThreeFormData: StepThreeState;
}

const PublishListing = (props: PublishListingProps) => {
  const {
    shouldMakeApiCall,
    stepOneFormData,
    stepTwoFormData,
    stepThreeFormData,
  } = props;

  useEffect(() => {
    if (shouldMakeApiCall) {
      const address = `${stepOneFormData.street}, ${stepOneFormData.city}, ${stepOneFormData.province}, ${stepOneFormData.postal}, ${stepOneFormData.country}`;

      handleGeocode(address).then((response) => {
        if (response.success) {
          console.log("lat lng", response.lat, response.lng);
        } else {
          console.log("error getting lat lng");
        }
      });
    }
  }, [shouldMakeApiCall]);

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{
        pt: [0, 10],
      }}
    >
      <CircularProgress sx={{ width: "50%" }} />
      <Stack sx={{ width: "50%" }}>
        <Typography variant="caption">Creating your listing...</Typography>
        <Typography variant="caption">
          Please do not go back or refresh the page
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PublishListing;
