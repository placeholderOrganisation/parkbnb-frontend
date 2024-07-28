import { Box } from "@mui/material";
import NavbarHeadersMobileLayout from "./navbar-header.mobile";
import { NavbarLink } from "../../types/global.types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/global-store";
import { setIsAuthed, setUserData } from "../../redux/user-slice";
import { initialUserState } from "../../types/user-types";
import { useState } from "react";
import { removeItemFromCookies } from "../../utils/storage-utils";
import SnackBar from "../custom-mui/snackbars/snackbar";

export const NAVBAR_HEIGHT_MOBILE = 64;
const linksToRender: NavbarLink[] = [
  { name: "Post a listing", path: "/create-listing" },
  { name: "Search listings", path: "/listings" },
];

const NavbarHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [showSnackbarOnLogout, setShowSnackbarOnLogout] = useState(false);

  const Layout = NavbarHeadersMobileLayout;

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    navigate("/");
    dispatch(setIsAuthed(false));
    dispatch(setUserData(initialUserState));
    setShowSnackbarOnLogout(true);
    removeItemFromCookies("user");
  };

  return (
    // height of mobile navbar
    <Box
      sx={{
        height: `${NAVBAR_HEIGHT_MOBILE}px`,
      }}
    >
      <Layout
        linksToRender={linksToRender}
        handleLogoClick={handleLogoClick}
        user={user}
        logout={handleLogout}
      />
      <SnackBar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={showSnackbarOnLogout}
        handleClose={() => setShowSnackbarOnLogout(false)}
        message="Successfully logged out."
        severity="success"
      />
    </Box>
  );
};

export default NavbarHeader;
