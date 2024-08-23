import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
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
import { setIsAuthed, setUserData } from "../../redux/user-slice";
import { HandleSignInResponse, handleSignIn } from "../../utils/auth-utils";
import SocialAuth from "../../components/auth/social-auth";
import Copyright from "../../components/auth/copyright";
import { COMPANY_NAME } from "../../constants";
import { callAnalytics } from "../../utils/amplitude-utils";
import { useEffect, useState } from "react";
import SnackBar from "../../components/custom-mui/snackbars/snackbar";
import Footer from "../../components/footer/footer.component";
import RoundedButton from "../../components/custom-mui/rounded-button.component";
import Head from "../../components/seo/head.component";
import { seoContent } from "../../utils/seo-utils";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorOnSignIn, setErrorOnSignIn] = useState(false);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response: HandleSignInResponse = await handleSignIn(event);
    const { user } = response;
    if (response.success) {
      callAnalytics("api_success_sign_in", {
        strategy: "local",
      });
      dispatch(setIsAuthed(true));
      dispatch(setUserData(user));
      navigate("/transition");
    } else {
      const { error } = response;
      setErrorOnSignIn(true);
      callAnalytics("api_failure_sign_in", {
        error,
      });
    }
  };

  useEffect(() => {
    callAnalytics("sign_in_page_viewed");
  }, []);

  const { signInPage } = seoContent;
  const {
    pageTitle,
    pageDescription,
    pageImage,
    pageCanonicalUrl,
  } = signInPage;

  return (
    <>
      <Head
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageImage={pageImage}
        pageCanonicalUrl={pageCanonicalUrl}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            my: 5,
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
            <SocialAuth location="sign_in_page" />
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
            <RoundedButton
              otherProps={{
                type: "submit",
                fullWidth: true,
                variant: "contained",
              }}
              otherSx={{ mt: 3, mb: 2 }}
            >
              Sign in
            </RoundedButton>
          </Box>
        </Box>
        <Copyright sx={{ my: 2 }} />
        <SnackBar
          open={errorOnSignIn}
          severity="error"
          message="Error signing in. Please try again."
          handleClose={() => setErrorOnSignIn(false)}
        />
      </Container>
      <Box>
        <Footer />
      </Box>
    </>
  );
};

export default SignIn;
