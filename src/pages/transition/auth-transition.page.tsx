import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../redux/user-slice";
import { RootState } from "../../redux/global-store";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { handleCheckIfUserIsAuthenticated } from "../../utils/auth-utils";

export const AuthTransition = () => {
  useEffect(() => {
    handleCheckIfUserIsAuthenticated()
      .then((response) => {
        dispatch(setUserData(response.user));
        navigate(redirect_to);
      })
      .catch((error) => {
        console.error("An error occurred during form submission:", error);
        navigate("/sign-in");
      });
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect_to = useSelector((state: RootState) => state.auth.redirect_to);
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
