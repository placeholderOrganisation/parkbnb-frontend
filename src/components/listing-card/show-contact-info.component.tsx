import { Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BottomDrawer from "../drawers/BottomDrawer";
import PublishListingUnAuthedError from "../listings/create-listings/publish-listing-errors/unauth-error.component";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/global-store";
import {
  // getNumberOfListingsViewedThisSession,
  hasUserAuthenticatedInThisSession,
  // hasUserSeenErrorSnackBar,
  incrementNumberOfListingsViewedThisSession,
  // setHasUserSeenErrorSnackBar,
} from "../../utils/auth-utils";
import { callAnalytics } from "../../utils/amplitude-utils";
import { openInNewTab } from "../../utils/browser-utils";
import { interestMessageBody } from "../../constants";
// import SnackBar from "../custom-mui/snackbars/snackbar";
import { isDesktop } from "../../utils/display-utils";
import RoundedButton from "../custom-mui/rounded-button.component";

interface ShowContactInfoComponentProps {
  contactNumber: string;
}

// deefault error message
const errorMessage = "You need to be signed in to view contact information";

const ShowContactInfoComponent = (props: ShowContactInfoComponentProps) => {
  const { contactNumber } = props;

  const { listingId } = useParams<{ listingId: string }>();
  const redirectDestinationAfterAuth = `/listing/${listingId}`;

  const isDesktopView = isDesktop();

  const isAuthed = useSelector((state: RootState) => state.user.isAuthed);
  const hasUserAuthenticatedInPastFiveMins = hasUserAuthenticatedInThisSession();
  // const numberOfListingsViewedInCookie = getNumberOfListingsViewedThisSession();
  // const hasUserSeenErrorSnackBarThisSession = hasUserSeenErrorSnackBar();
  const showContactInfo = isAuthed || hasUserAuthenticatedInPastFiveMins;
  // || numberOfListingsViewedInCookie <= 1;
  const [isErrorDrawerOpen, setIsErrorDrawerOpen] = useState(false);
  // const [showSnackBar, setShowSnackBar] = useState(
  //   numberOfListingsViewedInCookie >= 1 && !hasUserSeenErrorSnackBarThisSession
  // );

  // button is only rendered when user is not authed
  const handleClick = () => {
    callAnalytics("error_viewing_contact_info", {
      code: "unauthed_user_tried_view_contact_info",
    });
    setIsErrorDrawerOpen(true);
  };

  const trackGoogleConversion = () => {
    // @ts-ignore
    window.gtag("event", "conversion", {
      send_to: "AW-16650672623/Xg5VCPHI-soZEO-z1IM-",
      value: 1.0,
      currency: "CAD",
    });
  };

  const handleSmsOptionClick = () => {
    const currentUrl = window.location.href;
    callAnalytics("contact_host_clicked", {
      listingId,
      channel: "sms",
    });
    trackGoogleConversion();
    openInNewTab(
      `sms:${contactNumber}?&body=${interestMessageBody} ${currentUrl}`
    );
  };

  const handleWhatsappOptionClick = () => {
    const sanitizedContactNumberForWhatsapp = contactNumber.replace("-", "");
    callAnalytics("contact_host_clicked", {
      listingId,
      channel: "whatsapp",
    });
    trackGoogleConversion();
    openInNewTab(
      `https://wa.me/${sanitizedContactNumberForWhatsapp}?text=${interestMessageBody}`
    );
  };

  const handleCallOptionClick = () => {
    callAnalytics("contact_host_clicked", {
      listingId,
      channel: "call",
    });
    trackGoogleConversion();
    openInNewTab(`tel:${contactNumber}`);
  };

  // const handleCloseSnackBar = () => {
  //   // setShowSnackBar(false);
  //   setHasUserSeenErrorSnackBar();
  // };

  useEffect(() => {
    if (showContactInfo) {
      callAnalytics("success_viewing_contact_info", {
        listingId,
        hasUserAuthenticatedInPastFiveMins,
        isAuthed,
      });

      return () => {
        incrementNumberOfListingsViewedThisSession();
      };
    }
  }, []);

  if (showContactInfo) {
    return (
      <>
        <Stack spacing={1}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: "center",
            }}
          >
            <RoundedButton
              otherProps={{
                fullWidth: true,
                variant: "contained",
                onClick: handleSmsOptionClick,
              }}
            >
              SMS
            </RoundedButton>
            <RoundedButton
              otherProps={{
                fullWidth: true,
                variant: "contained",
                onClick: handleWhatsappOptionClick,
              }}
            >
              Whatsapp
            </RoundedButton>
          </Stack>
          <RoundedButton
            otherProps={{
              variant: "outlined",
              onClick: handleCallOptionClick,
            }}
          >
            Call {contactNumber}
          </RoundedButton>
        </Stack>
      </>
    );
  }

  const label = isDesktopView
    ? "Sign in to view contact info"
    : "Sign in to view contact info";

  return (
    <>
      <Box>
        <RoundedButton
          otherProps={{
            fullWidth: true,
            variant: "contained",
            color: "primary",
            onClick: handleClick,
          }}
        >
          {label}
        </RoundedButton>
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
      {/* <SnackBar
        open={showSnackBar}
        message={"Please sign in to view contact information"}
        severity="error"
        handleClose={handleCloseSnackBar}
      /> */}
    </>
  );
};

export default ShowContactInfoComponent;
