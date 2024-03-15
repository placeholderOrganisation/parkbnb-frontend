import { Box } from "@mui/material";
import { isDesktop } from "../../utils/display-utils";
import GetListingsDesktopLayout from "./get-listing.desktop";
import GetListingsMobileLayout from "./get-listing.mobile";
import { listingsOnMap } from "../../seeds/listings";

const GetListing = () => {
  const isDesktopView = isDesktop();
  const Layout = isDesktopView
    ? GetListingsDesktopLayout
    : GetListingsMobileLayout;

  return (
    <Box>
      <Layout searchResults={listingsOnMap} />
    </Box>
  );
};

export default GetListing;
