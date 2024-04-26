import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/user-slice";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { handleCheckIfUserIsAuthenticated } from "../../utils/auth-utils";
import { getItemFromSessionStorage } from "../../utils/storage-utils";

const AuthTransition = () => {
  useEffect(() => {
    handleCheckIfUserIsAuthenticated()
      .then((response) => {
        dispatch(setUserData(response.user));
        if (redirectToInSessionStorage) {
          navigate(redirectToInSessionStorage);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("An error occurred during form submission:", error);
        navigate("/sign-in");
      });
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirectToInSessionStorage = getItemFromSessionStorage("auth_redirect");
  return (
    <Box
      sx={{
        py: 2,
        pr: 2,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default AuthTransition;
