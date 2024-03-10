import { Box } from "@mui/material";
import { isDesktop } from "../../utils/display-utils";
import NavbarHeadersDesktopLayout from "./navbar-header.desktop";
import NavbarHeadersMobileLayout from "./navbar-header.mobile";

const NavbarHeader = () => {
  const isDesktopView = isDesktop();
  const Layout = isDesktopView
    ? NavbarHeadersDesktopLayout
    : NavbarHeadersMobileLayout;

  const signInPageUrl = "/sign-in";

  return (
    // height of mobile navbar
    <Box
      sx={{
        width: "100%",
        height: "55px",
      }}
    >
      <Layout signInPageUrl={signInPageUrl} />
    </Box>
  );
};

export default NavbarHeader;
