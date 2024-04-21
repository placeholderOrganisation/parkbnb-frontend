import { Stack, Typography, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRedirectDestinationAfterAuth } from "../../../../redux/auth-slice";

interface PublishListingUnAuthedErrorProps {
  redirectDestinationAfterAuth: string;
  errorMessage: string;
}

const PublishListingUnAuthedError = (
  props: PublishListingUnAuthedErrorProps
) => {
  const { redirectDestinationAfterAuth, errorMessage } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    // add auth_redirect to redux user state
    dispatch(setRedirectDestinationAfterAuth(redirectDestinationAfterAuth));
    navigate("/sign-in");
  };
  return (
    <Stack
      sx={{
        pb: [5, 0],
        height: "100%",
        position: "relative",
      }}
    >
      <Typography variant="h4">Something went wrong</Typography>
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
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          fullWidth
        >
          Sign in
        </Button>
      </Box>
    </Stack>
  );
};

export default PublishListingUnAuthedError;
