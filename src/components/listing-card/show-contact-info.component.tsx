import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BottomDrawer from "../drawers/BottomDrawer";
import PublishListingUnAuthedError from "../listings/create-listings/publish-listing-errors/unauth-error.component";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/global-store";
import { hasUserAuthenticatedInThisSession } from "../../utils/auth-utils";
import { callAnalytics } from "../../utils/amplitude-utils";
import { openInNewTab } from "../../utils/browser-utils";
import { interestMessageBody } from "../../constants";

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
  const hasUserAuthenticatedInPastFiveMins = hasUserAuthenticatedInThisSession();
  const [isErrorDrawerOpen, setIsErrorDrawerOpen] = useState(false);

  // button is only rendered when user is not authed
  const handleClick = () => {
    callAnalytics("error_viewing_contact_info", {
      code: "unauthed_user_tried_view_contact_info",
    });
    setIsErrorDrawerOpen(true);
  };

  const handleContactHostClick = () => {
    const currentUrl = window.location.href;
    callAnalytics("contact_host_clicked", {
      listingId,
    });
    openInNewTab(
      `sms:${contactNumber}?&body=${interestMessageBody} ${currentUrl}`
    );
  };

  if (isAuthed || hasUserAuthenticatedInPastFiveMins) {
    useEffect(() => {
      callAnalytics("success_viewing_contact_info", {
        listingId,
        hasUserAuthenticatedInPastFiveMins,
        isAuthed,
      });
    }, []);

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
          onClick={handleContactHostClick}
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
