import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../redux/user-slice";
import { RootState } from "../../redux/global-store";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

export const AuthTransition = () => {
  useEffect(() => {
    axios
      .get("http://localhost:3001/v1/auth/login/success", {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((response) => {
        dispatch(setUserData(response.data.user));
        navigate(redirect_to);
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
