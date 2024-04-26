import { Box } from "@mui/material";
import { isDesktop } from "../../utils/display-utils";
import GetListingsDesktopLayout from "./get-listing.desktop";
import GetListingsMobileLayout from "./get-listing.mobile";
import { useDispatch, useSelector } from "react-redux";
import {
  setListingsRenderedInMap,
  setSearchResults,
  setUserSelectedListing,
} from "../../redux/search-slice";
import {
  convertListingObjToListingOnMapObj,
  getListingFromListingArrayGivenId,
  handleGetParkings,
} from "../../utils/parking-utils";
import { useEffect } from "react";
import { Listing } from "../../types/global.types";
import { RootState } from "../../redux/global-store";
import { NAVBAR_HEIGHT_MOBILE } from "../../components/navbar/navbar-header.component";

const GetListing = () => {
  const dispatch = useDispatch();
  const isDesktopView = isDesktop();
  const Layout = isDesktopView
    ? GetListingsDesktopLayout
    : GetListingsMobileLayout;

  const searchResults = useSelector(
    (state: RootState) => state.search.searchResults
  );
  const filteredSearchResults = useSelector(
    (state: RootState) => state.search.filteredSearchResults
  );

  const userSelectedListing = useSelector(
    (state: RootState) => state.search.userSelectedListing
  );

  const searchQuery = useSelector(
    (state: RootState) => state.search.filters.searchQuery
  );

  const formattedfilteredSearchResults = filteredSearchResults.map(
    convertListingObjToListingOnMapObj
  );

  const formattedUserSelectedListing =
    userSelectedListing &&
    convertListingObjToListingOnMapObj(userSelectedListing);

  useEffect(() => {
    // fecth listings from backend
    handleGetParkings()
      .then((res) => {
        const fetchedListings: Listing[] = res.data;
        dispatch(setSearchResults(fetchedListings));
      })
      .catch((error) => {
        console.error("Error fetching listings", error);
      });
  }, []);

  const handleListingClickInMap = (id: string) => {
    const selectedListing = getListingFromListingArrayGivenId(
      searchResults,
      id
    );
    dispatch(setUserSelectedListing(selectedListing));
  };

  const handleMoveEndInMap = (listingIds: string[]) => {
    const listings = listingIds.map((id) =>
      getListingFromListingArrayGivenId(searchResults, id)
    );
    dispatch(setListingsRenderedInMap(listings));
  };

  return (
    <Box
      sx={{
        height: `calc(100vh - ${NAVBAR_HEIGHT_MOBILE}px)`,
        overflow: "hidden",
      }}
    >
      <Layout
        searchQuery={searchQuery}
        userSelectedListing={formattedUserSelectedListing}
        searchResults={formattedfilteredSearchResults}
        handleListingClickInMap={handleListingClickInMap}
        handleMoveEndInMap={handleMoveEndInMap}
      />
    </Box>
  );
};

export default GetListing;
