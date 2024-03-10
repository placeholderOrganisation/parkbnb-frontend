import { useState } from "react";
import { AppBar, Box, Toolbar, Button, IconButton } from "@mui/material";

import logo from "/vite.svg";
import NavbarRightFullPageDrawer from "../drawers/navbar-right-drawer.component";

const NavbarHeadersMobileLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openRightDrawer = () => {
    console.log("open right drawer");
    setDrawerOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={logo} alt="" />
          </IconButton>
          <Button color="inherit" onClick={openRightDrawer}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <NavbarRightFullPageDrawer
        anchor="right"
        open={drawerOpen}
        drawerClose={() => setDrawerOpen(false)}
        drawerOpen={() => setDrawerOpen(true)}
      >
        settings
      </NavbarRightFullPageDrawer>
    </Box>
  );
};

export default NavbarHeadersMobileLayout;
