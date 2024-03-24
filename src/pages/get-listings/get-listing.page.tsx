import { Box } from "@mui/material";
import { isDesktop } from "../../utils/display-utils";
import GetListingsDesktopLayout from "./get-listing.desktop";
import GetListingsMobileLayout from "./get-listing.mobile";
import { listingsOnMap } from "../../seeds/listings";
import { useDispatch, useSelector } from "react-redux";
import {
  setListingsRenderedInMap,
  setSearchResults,
  setUserSelectedListing,
} from "../../redux/search-slice";
import {
  convertListingObjToListingOnMapObj,
  convertListingOnMapObjToListingObj,
  getListingFromResultsGivenId,
} from "../../utils/parking-utils";
import { useEffect } from "react";
import { Listing } from "../../types/global.types";
import { RootState } from "../../redux/global-store";

const GetListing = () => {
  const dispatch = useDispatch();
  const isDesktopView = isDesktop();
  const Layout = isDesktopView
    ? GetListingsDesktopLayout
    : GetListingsMobileLayout;

  const searchResults = useSelector(
    (state: RootState) => state.search.searchResults
  );

  const formattedSearchResults = searchResults.map((listing) => {
    return convertListingObjToListingOnMapObj(listing);
  });

  useEffect(() => {
    const listings: Listing[] = listingsOnMap.map((listingOnMap) => {
      return convertListingOnMapObjToListingObj(listingOnMap);
    });

    dispatch(setSearchResults(listings));
  }, []);

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

  return (
    <Box>
      <Layout
        searchResults={formattedSearchResults}
        handleListingClickInMap={handleListingClickInMap}
        handleMoveEndInMap={handleMoveEndInMap}
      />
    </Box>
  );
};

export default GetListing;
