import { ReactNode } from "react";
import { Box, Drawer, IconButton } from "@mui/material";
import { isDesktop } from "../../utils/display-utils";
import CloseIcon from "@mui/icons-material/Close";

interface BottomDrawerProps {
  open: boolean;
  handleClose?: () => void;
  children: ReactNode;
}

const BottomDrawer = (props: BottomDrawerProps) => {
  const { open, handleClose, children } = props;

  const isDesktopView = isDesktop();

  // if handleClose is passed, the drawer will have a close button
  // and the height will be 100vh - (80px + 40px)
  const desktopHeight = handleClose
    ? `calc(100vh - 120px)`
    : `calc(100vh - 80px)`;

  return (
    <Drawer
      anchor={isDesktopView ? "right" : "bottom"}
      open={open}
      onClose={handleClose}
    >
      <Box
        sx={{ p: 5, height: ["100%", desktopHeight], width: ["inherit", 400] }}
      >
        {handleClose && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: 2,
            }}
          >
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        {children}
      </Box>
    </Drawer>
  );
};

export default BottomDrawer;
