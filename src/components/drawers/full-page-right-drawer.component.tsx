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

  console.log("otherprops");
  return (
    <Drawer
      anchor="right"
      open={open}
      {...otherprops}
      sx={{
        "& .MuiDrawer-paper": {
          width: "-webkit-fill-available",
          height: "-webkit-fill-available",
          p: 2,
          overflow: allowOverflow ? "auto" : "visible",
        },
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
          }}
        >
          <Typography variant="h4" component="div">
            {drawerTitle}
          </Typography>
          <CloseIcon onClick={drawerClose} />
        </Stack>
        {/* Drawer header end */}
        {children}
        {/* Drawer footer start */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            px: 2,
            width: "-webkit-fill-available",
            my: 4,
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
