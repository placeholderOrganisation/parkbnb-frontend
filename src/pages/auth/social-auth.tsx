import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Button, Divider, Stack, Typography } from "@mui/material";

const SocialAuth = () => {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined">
          <GoogleIcon
            sx={{
              fill: "#DF3E30",
            }}
          />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
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
