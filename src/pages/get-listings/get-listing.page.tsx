import { Box } from "@mui/material";
import { isDesktop } from "../../utils/display-utils";
import GetListingsDesktopLayout from "./get-listing.desktop";
import GetListingsMobileLayout from "./get-listing.mobile";
import { listingsOnMap } from "../../seeds/listings";
import { useDispatch } from "react-redux";
import {
  setListingsRenderedInMap,
  setUserSelectedListing,
} from "../../redux/search-slice";
import { getListingFromResultsGivenId } from "../../utils/parking-utils";

const GetListing = () => {
  const dispatch = useDispatch();

  const handleListingClickInMap = (id: string) => {
    const selectedListing = getListingFromResultsGivenId(listingsOnMap, id);
    dispatch(setUserSelectedListing(selectedListing));
  };

  const handleMoveEndInMap = (listingIds: string[]) => {
    const listings = listingIds.map((id) =>
      getListingFromResultsGivenId(listingsOnMap, id)
    );
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
