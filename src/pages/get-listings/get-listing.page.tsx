import { Box } from "@mui/material";
import { isDesktop } from "../../utils/display-utils";
import GetListingsDesktopLayout from "./get-listing.desktop";
import GetListingsMobileLayout from "./get-listing.mobile";

const listings = [
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-79.731989, 43.760685],
    },
    properties: {
      title: "Mapbox",
      description: "<h2>$500</h2>",
      id: 1,
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-79.727397, 43.763645],
    },
    properties: {
      title: "Mapbox",
      description: "<h2>$300</h2>",
      id: 2,
    },
  },
];

const GetListing = () => {
  const isDesktopView = isDesktop();
  const Layout = isDesktopView
    ? GetListingsDesktopLayout
    : GetListingsMobileLayout;

  return (
    <Box>
      <Layout listings={listings} />
    </Box>
  );
};

export default GetListing;
