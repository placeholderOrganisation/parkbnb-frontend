import { Drawer } from "@mui/material";

const NavbarRightFullPageDrawer = (props: any) => {
  const { drawerOpen, drawerClose, children, ...otherprops } = props;

  return (
    <Drawer
      open={drawerOpen}
      onClose={drawerClose}
      {...otherprops}
      sx={{
        "& .MuiDrawer-paper": {
          width: "90vw",
          height: "100vh",
        },
      }}
    >
      {children}
    </Drawer>
  );
};

export default NavbarRightFullPageDrawer;
