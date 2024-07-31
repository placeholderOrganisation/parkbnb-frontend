import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import Copyright from "../../components/auth/copyright";
import { HandleSignUpResponse, handleSignUp } from "../../utils/auth-utils";
import { useDispatch } from "react-redux";
import { setIsAuthed, setUserData } from "../../redux/user-slice";
import SocialAuth from "../../components/auth/social-auth";
import { callAnalytics } from "../../utils/amplitude-utils";
import SnackBar from "../../components/custom-mui/snackbars/snackbar";
import Footer from "../../components/footer/footer.component";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorOnSignUp, setErrorOnSignup] = useState(false);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response: HandleSignUpResponse = await handleSignUp(event);
    const { user } = response;
    if (response.success) {
      callAnalytics("api_success_sign_up", {
        strategy: "local",
      });
      dispatch(setIsAuthed(true));
      dispatch(setUserData(user));
      navigate("/transition");
    } else {
      setErrorOnSignup(true);
      callAnalytics("api_failure_sign_up");
    }
  };

  useEffect(() => {
    callAnalytics("sign_up_page_viewed");
  }, []);

  return (
    <>
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
              Sign up
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 2,
              }}
            >
              Already have an account?{" "}
              <RouterLink to="/sign-in">
                <Link variant="body2">{"Sign in"}</Link>
              </RouterLink>
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 4,
              width: "100%",
            }}
          >
            <SocialAuth location="sign_up_page" />
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={onSubmitHandler}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ my: 4 }} />
        <SnackBar
          open={errorOnSignUp}
          severity="error"
          message="Error signing up. Please try again."
          handleClose={() => setErrorOnSignup(false)}
        />
      </Container>
      <Box>
        <Footer />
      </Box>
    </>
  );
};

export default SignUp;
