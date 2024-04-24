import { Box } from "@mui/material";
import NavbarHeadersMobileLayout from "./navbar-header.mobile";
import { NavbarLink } from "../../types/global.types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/global-store";
import { setUserData } from "../../redux/user-slice";
import { initialUserState } from "../../types/user-types";

export const NAVBAR_HEIGHT_MOBILE = 64;
const linksToRender: NavbarLink[] = [
  { name: "Post a listing", path: "/create-listing" },
  { name: "Search listings", path: "/" },
];

const NavbarHeader = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Layout = NavbarHeadersMobileLayout;

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(setUserData(initialUserState));
    navigate("/");
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
        isUserAuthed={user.isAuthed}
        logout={handleLogout}
      />
    </Box>
  );
};

export default NavbarHeader;
