import {
  CircularProgress,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { useDispatch } from "react-redux";
import { setUserLocation } from "../../redux/search-slice";
import { MouseEvent, useState } from "react";
import SnackBar from "../custom-mui/snackbars/snackbar";
import { callAnalytics } from "../../utils/amplitude-utils";

interface NearMeSuggestionProps {
  handleCloseSuggestionList: (
    e?: MouseEvent<Element | MouseEvent> | undefined
  ) => void;
}

export const NearMeOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

const NearMeSuggestion = (props: NearMeSuggestionProps) => {
  const { handleCloseSuggestionList } = props;
  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleNearMeSuccessCallback = (pos: GeolocationPosition) => {
    const crd = pos.coords;
    callAnalytics("near me search clicked", {
      crd,
      success: true,
    });
    dispatch(
      setUserLocation({ latitude: crd.latitude, longitude: crd.longitude })
    );
    setLoading(false);
    setSuccess(true);
  };

  const handleNearMeErrorCallback = (error: any) => {
    callAnalytics("near me search clicked", {
      error,
      success: false,
    });
    setError(true);
    setLoading(false);
  };

  const handleCloseSuggestionListAndSnackBar = (flag: any) => {
    if (flag === "success") {
      setSuccess(false);
    }
    if (flag === "error") {
      setError(false);
    }
    handleCloseSuggestionList();
  };

  const handleNearMeClick = () => {
    if (navigator.geolocation && !loading) {
      setLoading(true);
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          //If granted then you can directly call your function here
          navigator.geolocation.getCurrentPosition(
            handleNearMeSuccessCallback,
            handleNearMeErrorCallback,
            NearMeOptions
          );
        } else if (result.state === "prompt") {
          //If prompt then the user will be asked to give permission
          navigator.geolocation.getCurrentPosition(
            handleNearMeSuccessCallback,
            handleNearMeErrorCallback,
            NearMeOptions
          );
        } else if (result.state === "denied") {
          //If denied then the ask user to give permission
          navigator.geolocation.getCurrentPosition(
            handleNearMeSuccessCallback,
            handleNearMeErrorCallback,
            NearMeOptions
          );
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <ListItem
        sx={{
          px: [2, 0],
          cursor: "pointer",
        }}
        onClick={handleNearMeClick}
      >
        <ListItemIcon
          sx={{
            minWidth: 32,
          }}
        >
          <NearMeOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Near me" />
        {loading ? (
          <CircularProgress
            color="primary"
            size="lg"
            sx={{
              width: 20,
              height: 20,
            }}
          />
        ) : (
          <ListItemSecondaryAction
            sx={{
              right: [16, 0],
            }}
          >
            <IconButton
              edge="end"
              aria-label="click me"
              onClick={handleNearMeClick}
            >
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
      <SnackBar
        open={error}
        handleClose={() => handleCloseSuggestionListAndSnackBar("error")}
        severity="error"
        message="Could not access your location. Please check your location settings."
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={4000}
        otherSx={{
          bottom: 80,
        }}
      />
      <SnackBar
        open={success}
        handleClose={() => handleCloseSuggestionListAndSnackBar("success")}
        severity="success"
        message="Location updated successfully."
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={2000}
        otherSx={{
          bottom: 80,
        }}
      />
    </>
  );
};

export default NearMeSuggestion;
