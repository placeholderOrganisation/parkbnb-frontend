import { Box, Drawer, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const RightFullPageDrawer = (props: any) => {
  const {
    drawerOpen,
    drawerClose,
    drawerTitle,
    children,
    footer,
    ...otherprops
  } = props;

  return (
    <Drawer
      open={drawerOpen}
      {...otherprops}
      sx={{
        "& .MuiDrawer-paper": {
          width: "-webkit-fill-available",
          height: "-webkit-fill-available",
          p: 2,
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
