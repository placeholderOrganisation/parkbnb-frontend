import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { handleSocialSignIn as handleSocialSignInUtilFunc } from "../../utils/auth-utils";
import { callAnalytics } from "../../utils/amplitude-utils";
import { useEffect, useState } from "react";

interface SocialAuthProps {
  location?: string;
  prepAuthRedirect?: () => void; // function to set the redirect destination in session storage
}

const SocialAuth = (props: SocialAuthProps) => {
  const { location, prepAuthRedirect = () => {} } = props;

  const [provider, setProvider] = useState("");
  const [startSocialAuth, setStartSocialAuth] = useState(false);

  useEffect(() => {
    if (startSocialAuth) {
      callAnalytics("api_complete_social_auth", {
        location,
      });
      prepAuthRedirect();
      handleSocialSignInUtilFunc(provider);
      setStartSocialAuth(false);
    }
  }, [startSocialAuth, provider]);

  const handleSocialSignIn = async (provider: string) => {
    setProvider(provider);
    setStartSocialAuth(true);
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={() => handleSocialSignIn("google")}
        >
          <GoogleIcon
            sx={{
              fill: "#DF3E30",
            }}
          />
        </Button>

        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={() => handleSocialSignIn("facebook")}
        >
          <FacebookIcon
            sx={{
              fill: "#1877F2",
            }}
          />
        </Button>
      </Stack>
      <Divider sx={{ mt: 3, mb: 2 }}>
        <Typography variant="body2">OR</Typography>
      </Divider>
    </>
  );
};

export default SocialAuth;
