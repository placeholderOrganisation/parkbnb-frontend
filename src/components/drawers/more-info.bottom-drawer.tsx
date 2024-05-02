import { ReactNode, useState } from "react";
import BottomDrawer from "./BottomDrawer";
import { IconButton, Stack, Typography } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

interface MoreInfoDrawerProps {
  label: string;
  children: ReactNode;
}

const MoreInfoDrawer = (props: MoreInfoDrawerProps) => {
  const { label, children } = props;
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
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
