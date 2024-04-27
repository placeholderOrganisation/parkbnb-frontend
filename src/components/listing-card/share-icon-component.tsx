import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import BottomDrawer from "../drawers/BottomDrawer";
import { useState } from "react";
import { copyToClipboard } from "../../utils/browser-utils";
import SnackBar from "../custom-mui/snackbars/snackbar";

interface ShareIconProps {
  circularBorder?: boolean;
}

const SNS = [
  {
    name: "Copy",
  },
];

const ShareIcon = (props: ShareIconProps) => {
  const { circularBorder } = props;
  const [openShareDrawer, setOpenShareDrawer] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [errorDuringCopy, setErrorDuringCopy] = useState(false);

  const currentUrl = window.location.href;

  const handleOpenShareDrawer = () => {
    setOpenShareDrawer(true);
  };

  const handleCopyOptionClick = async () => {
    const isCopied = await copyToClipboard(currentUrl);
    if (isCopied) {
      setOpenShareDrawer(false);
      setOpenSnackBar(true);
    } else {
      setOpenShareDrawer(false);
      setOpenSnackBar(true);
      setErrorDuringCopy(true);
    }
  };

  return (
    <>
      <Box
        sx={
          circularBorder
            ? {
                bgcolor: "common.white",
                width: 40,
                height: 40,
                borderRadius: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }
            : {}
        }
        onClick={handleOpenShareDrawer}
      >
        <ShareOutlinedIcon sx={{ color: "primary.main", cursor: "pointer" }} />
      </Box>
      <BottomDrawer
        open={openShareDrawer}
        handleClose={() => {
          setOpenShareDrawer(false);
        }}
      >
        <Typography variant="h4">Share this listing</Typography>
        <List>
          {SNS.map((sns) => (
            <Box key={sns.name}>
              <ListItem disablePadding onClick={handleCopyOptionClick}>
                <ListItemButton
                  sx={{
                    px: 0,
                  }}
                >
                  <ListItemText primary={sns.name} />
                  <ListItemIcon
                    sx={{
                      minWidth: "unset",
                    }}
                  >
                    <ChevronRightIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Box>
          ))}
        </List>
      </BottomDrawer>
      <SnackBar
        open={openSnackBar}
        handleClose={() => {
          setOpenSnackBar(false);
        }}
        message={errorDuringCopy ? "Something went wrong!" : "Copied!"}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        severity={errorDuringCopy ? "error" : "success"}
      />
    </>
  );
};

export default ShareIcon;
