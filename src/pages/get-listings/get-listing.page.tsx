import { Box } from "@mui/material";
import { isDesktop } from "../../utils/display-utils";
import GetListingsDesktopLayout from "./get-listing.desktop";
import GetListingsMobileLayout from "./get-listing.mobile";
import { listingsOnMap } from "../../seeds/listings";
import { Listing } from "../../types/global.types";
import { useDispatch } from "react-redux";
import {
  setListingsRenderedInMap,
  setUserSelectedListing,
} from "../../redux/search-slice";

const GetListing = () => {
  const dispatch = useDispatch();

  const handleListingClickInMap = (listing: Listing) => {
    dispatch(setUserSelectedListing(listing));
  };

  const handleMoveEndInMap = (listings: Listing[]) => {
    dispatch(setListingsRenderedInMap(listings));
  };

  const isDesktopView = isDesktop();
  const Layout = isDesktopView
    ? GetListingsDesktopLayout
    : GetListingsMobileLayout;

  return (
    <Box>
      <Layout
        searchResults={listingsOnMap}
        handleListingClickInMap={handleListingClickInMap}
        handleMoveEndInMap={handleMoveEndInMap}
      />
    </Box>
  );
};

export default GetListing;
