import { ReactNode } from "react";
import { Box, Drawer } from "@mui/material";
import { isDesktop } from "../../utils/display-utils";

interface BottomDrawerProps {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
}

const BottomDrawer = (props: BottomDrawerProps) => {
  const { open, handleClose, children } = props;

  const isDesktopView = isDesktop();

  return (
    <Drawer
      anchor={isDesktopView ? "right" : "bottom"}
      open={open}
      onClose={handleClose}
    >
      <Box sx={{ p: 5 }}>{children}</Box>
    </Drawer>
  );
};

export default BottomDrawer;
