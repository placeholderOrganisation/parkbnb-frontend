import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import NotListedLocationOutlinedIcon from "@mui/icons-material/NotListedLocationOutlined";
import { useState } from "react";
import SnackBar from "../custom-mui/snackbars/snackbar";

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

  return (
    <>
      <ListItem
        sx={{
          px: [2, 0],
          cursor: "pointer",
        }}
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
        />
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
