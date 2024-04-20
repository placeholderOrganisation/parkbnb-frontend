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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/global-store";
import PublishListingUnAuthedError from "./publish-listing-errors/unauth-error.component";
import PublishListingMissingContacInfoError from "./publish-listing-errors/missing-contact-info-error.component";
import { isContactNumberValid } from "../../../utils/user-utils";

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

  const navigate = useNavigate();
  const { isAuthed, id, contactNumber } = useSelector(
    (state: RootState) => state.user
  );

  const isContactNumberInValid = !isContactNumberValid(contactNumber);
  const [shouldUpdateUser, setShouldUpdateUser] = useState(
    isContactNumberInValid
  );
  const [isCreatingListing, setIsCreatingListing] = useState(false);

  const [addressWithLatLng, setAddressWithLatLng] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (shouldMakeApiCall && isAuthed && !shouldUpdateUser) {
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
  }, [shouldMakeApiCall, shouldUpdateUser]);

  useEffect(() => {
    if (isCreatingListing && isAuthed && !shouldUpdateUser) {
      // make api call to create listing
      const listingData = assembleCreateListingBody(
        stepOneFormData,
        stepTwoFormData,
        stepThreeFormData,
        addressWithLatLng.lat,
        addressWithLatLng.lng,
        id,
        contactNumber!
      );
      handleCreateParking(listingData).then((response) => {
        if (response.success) {
          setIsCreatingListing(false);
          navigate("/");
        } else {
          console.log("error creating listing");
        }
      });
    }
  }, [isCreatingListing, shouldUpdateUser]);

  useEffect(() => {
    const isUpdatedContactNumberValid = isContactNumberValid(contactNumber);
    if (isUpdatedContactNumberValid) {
      setShouldUpdateUser(false);
    } else {
      setShouldUpdateUser(true);
    }
  }, [contactNumber]);

  if (!isAuthed) {
    return <PublishListingUnAuthedError />;
  }

  if (!contactNumber) {
    return <PublishListingMissingContacInfoError />;
  }

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
