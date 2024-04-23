import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import BottomDrawer from "../drawers/BottomDrawer";
import PublishListingUnAuthedError from "../listings/create-listings/publish-listing-errors/unauth-error.component";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/global-store";

interface ShowContactInfoComponentProps {
  contactNumber: string;
}

// deefault error message
const errorMessage = "You need to be signed in to view contact information";

const ShowContactInfoComponent = (props: ShowContactInfoComponentProps) => {
  const { contactNumber } = props;

  const { listingId } = useParams<{ listingId: string }>();
  const redirectDestinationAfterAuth = `/listing/${listingId}`;

  const isAuthed = useSelector((state: RootState) => state.user.isAuthed);
  const [isErrorDrawerOpen, setIsErrorDrawerOpen] = useState(false);

  // button is only rendered when user is not authed
  const handleClick = () => {
    setIsErrorDrawerOpen(true);
  };

  if (isAuthed) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1">Contact number</Typography>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            ml: 0.5,
          }}
        >
          {contactNumber}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "100%",
          }}
          onClick={handleClick}
        >
          Contact host
        </Button>
      </Box>
      <BottomDrawer
        open={isErrorDrawerOpen}
        handleClose={() => {
          setIsErrorDrawerOpen(false);
        }}
      >
        <PublishListingUnAuthedError
          redirectDestinationAfterAuth={redirectDestinationAfterAuth}
          errorMessage={errorMessage}
        />
      </BottomDrawer>
    </>
  );
};

export default ShowContactInfoComponent;
