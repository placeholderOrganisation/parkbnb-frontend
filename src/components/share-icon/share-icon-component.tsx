import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Box, Typography } from "@mui/material";
import BottomDrawer from "../drawers/BottomDrawer";
import { useState } from "react";
import SnackBar from "../custom-mui/snackbars/snackbar";
import SharingOptions from "./sharing-options.component";
import { callAnalytics } from "../../utils/amplitude-utils";

interface ShareIconProps {
  circularBorder?: boolean;
}

const ShareIcon = (props: ShareIconProps) => {
  const { circularBorder } = props;
  const [openShareDrawer, setOpenShareDrawer] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const [errorDuringCopy, setErrorDuringCopy] = useState(false);

  const currentUrl = window.location.href;

  const handleOpenShareDrawer = () => {
    callAnalytics("share_icon_drawer_opened");
    setOpenShareDrawer(true);
  };

  const handleCloseShareDrawer = () => {
    callAnalytics("share_icon_drawer_closed");
    setOpenShareDrawer(false);
  };

  const handleSuccessCopy = () => {
    handleCloseShareDrawer();
    setOpenSnackBar(true);
  };

  const handleErrorCopy = () => {
    handleCloseShareDrawer();
    setOpenSnackBar(true);
    setErrorDuringCopy(true);
  };

  return (
    <>
      <Box
        sx={
          circularBorder
            ? {
                bgcolor: "common.white",
                width: 50,
                height: 50,
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
      <BottomDrawer open={openShareDrawer} handleClose={handleCloseShareDrawer}>
        <Typography variant="h4">Share this parking</Typography>
        <SharingOptions
          currentUrl={currentUrl}
          handleSuccessCopy={handleSuccessCopy}
          handleErrorCopy={handleErrorCopy}
        />
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
