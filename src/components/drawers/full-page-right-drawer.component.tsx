import { Box, Drawer, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface RightFullPageDrawerProps {
  open: boolean;
  drawerClose: () => void;
  drawerTitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  allowOverflow?: boolean;
}

const RightFullPageDrawer = (props: RightFullPageDrawerProps) => {
  const {
    open,
    drawerClose,
    drawerTitle,
    children,
    footer,
    allowOverflow = false,
    ...otherprops
  } = props;

  return (
    <Drawer
      anchor="right"
      open={open}
      {...otherprops}
      sx={{
        "& .MuiDrawer-paper": {
          width: ["-webkit-fill-available", "20vw"],
          height: "100vh",
          p: 2,
          overflow: allowOverflow ? "auto" : "visible",
        },
        zIndex: 9999,
      }}
      transitionDuration={300}
    >
      <>
        {/* Drawer header start */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            my: 4,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h4" component="div">
            {drawerTitle}
          </Typography>
          <CloseIcon
            onClick={drawerClose}
            sx={{
              cursor: "pointer",
            }}
          />
        </Stack>
        {/* Drawer header end */}
        {children}
        {/* Drawer footer start */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "-webkit-fill-available",
            zIndex: 1000,
            bgcolor: "background.paper",
          }}
        >
          {footer}
        </Box>
        {/* Drawer footer end */}
      </>
    </Drawer>
  );
};

export default RightFullPageDrawer;
