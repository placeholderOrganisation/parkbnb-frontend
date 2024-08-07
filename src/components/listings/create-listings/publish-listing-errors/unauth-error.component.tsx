import { Stack, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setRedirectDestinationAfterAuthInSessionStorage } from "../../../../utils/auth-utils";
import SocialAuth from "../../../auth/social-auth";
import RoundedButton from "../../../custom-mui/rounded-button.component";

interface PublishListingUnAuthedErrorProps {
  redirectDestinationAfterAuth: string;
  errorMessage: string;
}

const PublishListingUnAuthedError = (
  props: PublishListingUnAuthedErrorProps
) => {
  const { redirectDestinationAfterAuth, errorMessage } = props;
  const navigate = useNavigate();
  const handleClick = () => {
    // add auth_redirect to sessions storage
    updateAuthRedirectLink();
    navigate("/sign-in");
  };

  const updateAuthRedirectLink = () => {
    setRedirectDestinationAfterAuthInSessionStorage(
      redirectDestinationAfterAuth
    );
  };

  return (
    <Stack
      sx={{
        pb: 0,
        height: "100%",
        position: "relative",
      }}
    >
      <Typography variant="h4">Sign in to proceed</Typography>
      <Typography
        variant="body1"
        sx={{
          mt: 2,
          mb: 3,
        }}
      >
        {errorMessage}
      </Typography>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "-webkit-fill-available",
          zIndex: 1000,
          display: ["contents", "unset"],
        }}
      >
        <SocialAuth
          location="unauth_drawer"
          prepAuthRedirect={updateAuthRedirectLink}
        />
        <RoundedButton
          otherProps={{
            variant: "contained",
            color: "primary",
            onClick: handleClick,
            fullWidth: true,
          }}
        >
          Sign in via email
        </RoundedButton>
      </Box>
    </Stack>
  );
};

export default PublishListingUnAuthedError;
