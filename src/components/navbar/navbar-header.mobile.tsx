import { useState } from "react";
import { AppBar, Box, Toolbar, IconButton } from "@mui/material";

import logo from "/vite.svg";
import MenuIcon from "@mui/icons-material/Menu";
import RightFullPageDrawer from "../drawers/full-page-right-drawer.component";

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
          <IconButton color="inherit" onClick={openRightDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <RightFullPageDrawer
        anchor="right"
        open={drawerOpen}
        drawerClose={() => setDrawerOpen(false)}
        drawerOpen={() => setDrawerOpen(true)}
      >
        settings
      </RightFullPageDrawer>
    </Box>
  );
};

export default NavbarHeadersMobileLayout;
