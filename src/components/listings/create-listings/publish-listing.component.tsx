// TODO: add react query remove useeffect.
import { CircularProgress, Stack, Typography } from "@mui/material";
import {
  StepOneState,
  StepThreeState,
  StepTwoState,
} from "../../../types/create-listing-form.types";
import { handleGeocode } from "../../../utils/geo-coding.utils";
import { useEffect, useState } from "react";
import {
  assembleCreateListingBody,
  handleCreateParking,
} from "../../../utils/parking-utils";
import { test_user } from "../../../seeds/user";

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

  const user = test_user;
  const [isCreatingListing, setIsCreatingListing] = useState(false);
  const [addressWithLatLng, setAddressWithLatLng] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (shouldMakeApiCall) {
      const address = `${stepOneFormData.street}, ${stepOneFormData.city}, ${stepOneFormData.province}, ${stepOneFormData.postal}, ${stepOneFormData.country}`;

      handleGeocode(address).then((response) => {
        if (response.success) {
          setAddressWithLatLng({ lat: response.lat!, lng: response.lng! });
          setIsCreatingListing(true);
        } else {
          console.log("error getting lat lng");
        }
      });
    }
  }, [shouldMakeApiCall]);

  useEffect(() => {
    if (isCreatingListing) {
      // make api call to create listing
      const listingData = assembleCreateListingBody(
        stepOneFormData,
        stepTwoFormData,
        stepThreeFormData,
        addressWithLatLng.lat,
        addressWithLatLng.lng,
        user.id,
        user.contactNumber
      );
      handleCreateParking(listingData).then((response) => {
        if (response.success) {
          console.log("listing created", response);
          setIsCreatingListing(false);
        } else {
          console.log("error creating listing");
        }
      });
    }
  }, [isCreatingListing]);

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
