import { useState } from "react";
import { AppBar, Box, Toolbar, IconButton, Stack } from "@mui/material";

import logo from "/rentaparking.png";
import MenuIcon from "@mui/icons-material/Menu";
import RightFullPageDrawer from "../drawers/full-page-right-drawer.component";
import NavLinks from "./NavLinks";
import { NavbarLayoutProps } from "../../types/global.types";
import { NAVBAR_HEIGHT_MOBILE } from "./navbar-header.component";
import { useNavigate } from "react-router-dom";
import { COMPANY_NAME } from "../../constants";
import UserProfile from "./user-profile.component";
import UserImage from "./user-image.component";
import RoundedButton from "../custom-mui/rounded-button.component";

interface NavbarButtonProps {
  variant: "contained" | "outlined";
  children: string;
  handleOnClick?: () => void;
}

interface NavbarMobileFooterProps {
  isUserAuthed: boolean;
  handleAuthButtonClick: (path: string) => void;
  handleLogout: () => void;
}

const NavbarButton = (props: NavbarButtonProps) => {
  const { variant, children, handleOnClick } = props;
  return (
    <RoundedButton
      otherProps={{
        variant: variant,
        color: "primary",
        onClick: handleOnClick,
      }}
    >
      {children}
    </RoundedButton>
  );
};

const NavbarMobileFooter = (props: NavbarMobileFooterProps) => {
  const { isUserAuthed, handleAuthButtonClick, handleLogout } = props;
  return (
    <Stack
      spacing={2}
      sx={{
        py: 6,
        px: 2,
      }}
    >
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
  const { linksToRender, handleLogoClick, user, logout } = props;
  const { isAuthed: isUserAuthed } = user;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const openRightDrawer = () => {
    setDrawerOpen(true);
  };

  const closeRightDrawer = () => {
    setDrawerOpen(false);
  };

  const openUserDrawer = () => {
    setIsUserDrawerOpen(true);
  };

  const closeUserDrawer = () => {
    setIsUserDrawerOpen(false);
  };

  const handleAuthButtonClick = (path: string) => {
    navigate(path);
    closeRightDrawer();
  };

  const handleLogout = () => {
    logout();
    if (isUserDrawerOpen) {
      closeUserDrawer();
    }
    if (drawerOpen) {
      closeRightDrawer();
    }
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
            onClick={handleLogoClick}
          >
            <img style={{ height: "40px" }} src={logo} alt="" />
          </IconButton>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            {isUserAuthed && (
              <UserImage user={user} handleClick={openUserDrawer} />
            )}
            <IconButton color="inherit" onClick={openRightDrawer}>
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <RightFullPageDrawer
        open={drawerOpen}
        drawerClose={closeRightDrawer}
        drawerTitle={COMPANY_NAME}
        footer={
          <NavbarMobileFooter
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
      <RightFullPageDrawer
        open={isUserDrawerOpen}
        drawerClose={closeUserDrawer}
        drawerTitle="User Profile"
        footer={
          <NavbarMobileFooter
            isUserAuthed={isUserAuthed}
            handleAuthButtonClick={handleAuthButtonClick}
            handleLogout={handleLogout}
          />
        }
      >
        <UserProfile user={user} closeUserDrawer={closeUserDrawer} />
      </RightFullPageDrawer>
    </Box>
  );
};

export default NavbarHeadersMobileLayout;
