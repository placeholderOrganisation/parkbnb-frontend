import { ReactNode, useState } from "react";
import BottomDrawer from "./BottomDrawer";
import { IconButton, Stack, Typography } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { callAnalytics } from "../../utils/amplitude-utils";

interface MoreInfoDrawerProps {
  label: string;
  children: ReactNode;
  location: string;
}

const MoreInfoDrawer = (props: MoreInfoDrawerProps) => {
  const { label, children, location } = props;
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    callAnalytics("more-info-drawer-viewed", {
      location,
    });
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    callAnalytics("more-info-drawer-closed", {
      location,
    });
    setOpenDrawer(false);
  };

  return (
    <>
      <Stack spacing={0} sx={{ alignItems: "center" }} direction="row">
        <Typography variant="body2">{label}</Typography>
        <IconButton
          sx={{
            cursor: "pointer",
            color: "primary.main",
          }}
          size="small"
          onClick={handleOpenDrawer}
        >
          <InfoOutlined />
        </IconButton>
      </Stack>
      <BottomDrawer open={openDrawer} handleClose={handleCloseDrawer}>
        {children}
      </BottomDrawer>
    </>
  );
};

export default MoreInfoDrawer;
