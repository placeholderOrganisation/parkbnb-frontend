import { Box } from "@mui/material";
import { isDesktop } from "../../utils/display-utils";
import NavbarHeadersDesktopLayout from "./navbar-header.desktop";
import NavbarHeadersMobileLayout from "./navbar-header.mobile";

export const NAVBAR_HEIGHT_MOBILE = 55;

const NavbarHeader = () => {
  const isDesktopView = isDesktop();
  const Layout = isDesktopView
    ? NavbarHeadersDesktopLayout
    : NavbarHeadersMobileLayout;

  return (
    // height of mobile navbar
    <Box
      sx={{
        width: "100%",
        height: `${NAVBAR_HEIGHT_MOBILE}px`,
      }}
    >
      <Layout />
    </Box>
  );
};

export default NavbarHeader;
