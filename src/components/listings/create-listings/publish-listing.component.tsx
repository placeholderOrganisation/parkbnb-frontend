// TODO: add react query remove useeffect.
import { Box, CircularProgress, Typography } from "@mui/material";
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: [0, 10],
        }}
      >
        <Box
          sx={{
            py: 2,
            pr: 2,
          }}
        >
          <CircularProgress />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: ["unset", "60%"],
          }}
        >
          <Typography variant="h4">Creating your listing</Typography>
          <Typography variant="caption">
            Please do not go back or refresh the page
          </Typography>
        </Box>
      </Box>
  );
};

export default PublishListing;
