import { Box } from "@mui/material";
import { isDesktop } from "../../utils/display-utils";
import NavbarHeadersDesktopLayout from "./navbar-header.desktop";
import NavbarHeadersMobileLayout from "./navbar-header.mobile";
import { NavbarLink } from "../../types/global.types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/global-store";

export const NAVBAR_HEIGHT_MOBILE = 64;
const linksToRender: NavbarLink[] = [
  { name: "Post a listing", path: "/create-listing" },
  { name: "Search listings", path: "/" },
];

const NavbarHeader = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const isDesktopView = isDesktop();
  const Layout = isDesktopView
    ? NavbarHeadersDesktopLayout
    : NavbarHeadersMobileLayout;

  const handleLogoClick = () => {
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
      />
    </Box>
  );
};

export default NavbarHeader;
