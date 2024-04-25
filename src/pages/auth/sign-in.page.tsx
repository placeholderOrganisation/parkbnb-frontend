import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/user-slice";
import { HandleSignInResponse, handleSignIn } from "../../utils/auth-utils";
import SocialAuth from "../../components/auth/social-auth";
import Copyright from "../../components/auth/copyright";
import { COMPANY_NAME } from "../../constants";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response: HandleSignInResponse = await handleSignIn(event);
    const { user } = response;
    if (response.success) {
      dispatch(setUserData(user));
      navigate("/transition");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "start",
            flexDirection: "column",
          }}
        >
          <Typography component="h1" variant="h4">
            {`Sign in to ${COMPANY_NAME}`}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mt: 2,
            }}
          >
            Don't have an account?{" "}
            <RouterLink to="/sign-up">
              <Link variant="body2">{"Get started"}</Link>
            </RouterLink>
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 4,
            width: "100%",
          }}
        >
          <SocialAuth />
        </Box>
        <Box component="form" onSubmit={onSubmitHandler} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ my: 4 }} />
    </Container>
  );
};

export default SignIn;
