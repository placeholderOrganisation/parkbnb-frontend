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
import { useState } from "react";
import SnackBar from "../custom-mui/snackbars/snackbar";
import { callAnalytics } from "../../utils/amplitude-utils";

interface NearMeSuggestionProps {
  handleCloseSuggestionList: () => void;
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
          pl: [2, 0],
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
          <ListItemSecondaryAction>
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
        message="Error while fetching your location. Please check your browser settings."
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={4000}
      />
      <SnackBar
        open={success}
        handleClose={() => handleCloseSuggestionListAndSnackBar("success")}
        severity="success"
        message="Location fetched successfully."
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={2000}
      />
    </>
  );
};

export default NearMeSuggestion;
