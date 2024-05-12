import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsAuthed, setUserData } from "../../redux/user-slice";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { handleCheckIfUserIsAuthenticated } from "../../utils/auth-utils";
import { getItemFromSessionStorage } from "../../utils/storage-utils";
import { setStepOneData, setStepOneValidity } from "../../redux/step-one-slice";
import { getFormStateFromLocalStorage } from "../../utils/create-listing-form.utils";
import { setStepTwoData, setStepTwoValidity } from "../../redux/step-two-slice";
import {
  setStepThreeData,
  setStepThreeValidity,
} from "../../redux/step-three-slice";

const AuthTransition = () => {
  useEffect(() => {
    handleCheckIfUserIsAuthenticated()
      .then((response) => {
        dispatch(setIsAuthed(true));
        dispatch(setUserData(response.user));
        // set state we want to hold for user when they authenticate
        restoreCreateListingFormData();
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

  const restoreStepOneFormData = () => {
    const { stepOneFormData } = getFormStateFromLocalStorage();
    dispatch(setStepOneData(stepOneFormData));
    dispatch(setStepOneValidity());
  };

  const restoreStepTwoFormData = () => {
    const { stepTwoFormData } = getFormStateFromLocalStorage();
    dispatch(setStepTwoData(stepTwoFormData));
    dispatch(setStepTwoValidity());
  };

  const restoreStepThreeFormData = () => {
    const { stepThreeFormData } = getFormStateFromLocalStorage();
    dispatch(setStepThreeData(stepThreeFormData));
    dispatch(setStepThreeValidity());
  };

  const restoreCreateListingFormData = () => {
    restoreStepOneFormData();
    restoreStepTwoFormData();
    restoreStepThreeFormData();
  };

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
