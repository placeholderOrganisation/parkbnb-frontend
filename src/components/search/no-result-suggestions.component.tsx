import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NotListedLocationOutlinedIcon from "@mui/icons-material/NotListedLocationOutlined";
import { useState } from "react";
import SnackBar from "../custom-mui/snackbars/snackbar";
import { callAnalytics } from "../../utils/amplitude-utils";

interface NoSearchResultSuggestionProps {
  searchQuery: string;
}

const NoSearchResultSuggestion = (props: NoSearchResultSuggestionProps) => {
  const { searchQuery } = props;

  const [missingPlaceSnackbarOpen, setMissingPlaceSnackbarOpen] = useState(
    false
  );

  if (!searchQuery) {
    return null;
  }

  const reportMissingPlace = () => {
    setMissingPlaceSnackbarOpen(true);
    callAnalytics("missing place reported", {
      query: searchQuery,
    });
  };

  return (
    <>
      <ListItem
        sx={{
          px: [2, 0],
          cursor: "pointer",
        }}
        onClick={reportMissingPlace}
      >
        <ListItemIcon
          sx={{
            minWidth: 32,
          }}
        >
          <NotListedLocationOutlinedIcon
            sx={{
              color: "primary.main",
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={`No search results found for '${searchQuery}'`}
          secondary={"Report a missing city"}
        />
        <ListItemSecondaryAction
          sx={{
            right: [16, 0],
          }}
        >
          <IconButton
            edge="end"
            aria-label="click me"
            onClick={reportMissingPlace}
          >
            <ChevronRightIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <SnackBar
        open={missingPlaceSnackbarOpen}
        handleClose={() => setMissingPlaceSnackbarOpen(false)}
        message="Successfully reported missing place. Thank you!"
        severity="info"
        otherSx={{
          bottom: 80,
        }}
      />
    </>
  );
};

export default NoSearchResultSuggestion;
