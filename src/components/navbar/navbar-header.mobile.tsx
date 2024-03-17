import { useState } from "react";
import { AppBar, Box, Toolbar, IconButton, Button, Stack } from "@mui/material";

import logo from "/vite.svg";
import MenuIcon from "@mui/icons-material/Menu";
import RightFullPageDrawer from "../drawers/full-page-right-drawer.component";
import NavLinks from "./NavLinks";
import { NavbarLayoutProps } from "../../types/global.types";
import { NAVBAR_HEIGHT_MOBILE } from "./navbar-header.component";
import { useNavigate } from "react-router-dom";

interface NavbarButtonProps {
  variant: "contained" | "outlined";
  children: string;
  handleOnClick?: () => void;
}

interface RightFullPageDrawerFooterProps {
  isUserAuthed: boolean;
  handleAuthButtonClick: (path: string) => void;
  handleLogout: () => void;
}

const NavbarButton = (props: NavbarButtonProps) => {
  const { variant, children, handleOnClick } = props;
  return (
    <Button variant={variant} color="primary" onClick={handleOnClick}>
      {children}
    </Button>
  );
};

const RightFullPageDrawerFooter = (props: RightFullPageDrawerFooterProps) => {
  const { isUserAuthed, handleAuthButtonClick, handleLogout } = props;
  return (
    <Stack spacing={2}>
      {isUserAuthed ? (
        <>
          <NavbarButton variant="contained" handleOnClick={handleLogout}>
            Logout
          </NavbarButton>
        </>
      ) : (
        <>
          <NavbarButton
            variant="contained"
            handleOnClick={() => {
              handleAuthButtonClick(`/sign-in`);
            }}
          >
            Sign in
          </NavbarButton>
          <NavbarButton
            variant="outlined"
            handleOnClick={() => {
              handleAuthButtonClick(`/sign-up`);
            }}
          >
            Register
          </NavbarButton>
        </>
      )}
    </Stack>
  );
};

const NavbarHeadersMobileLayout = (props: NavbarLayoutProps) => {
  const { linksToRender, handleLogoClick, isUserAuthed } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const openRightDrawer = () => {
    setDrawerOpen(true);
  };

  const closeRightDrawer = () => {
    setDrawerOpen(false);
  };

  const handleAuthButtonClick = (path: string) => {
    navigate(path);
    closeRightDrawer();
  };

  const handleLogout = () => {
    // make backend api call to logout
    handleAuthButtonClick("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            height: `${NAVBAR_HEIGHT_MOBILE}px`,
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleLogoClick}
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
        drawerTitle={"Company name"}
        footer={
          <RightFullPageDrawerFooter
            isUserAuthed={isUserAuthed}
            handleAuthButtonClick={handleAuthButtonClick}
            handleLogout={handleLogout}
          />
        }
      >
        <NavLinks
          linksToRender={linksToRender}
          handleNavLinkClick={closeRightDrawer}
        />
      </RightFullPageDrawer>
    </Box>
  );
};

export default NavbarHeadersMobileLayout;
