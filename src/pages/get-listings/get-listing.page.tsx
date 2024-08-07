import { Box } from "@mui/material";
import { isDesktop } from "../../utils/display-utils";
import GetListingsDesktopLayout from "./get-listing.desktop";
import GetListingsMobileLayout from "./get-listing.mobile";
import { useDispatch, useSelector } from "react-redux";
import {
  filterSearchResults,
  setListingsRenderedInMap,
  setSearchQuery,
  setSearchResults,
  setUserSelectedListing,
  setUserSelectedListingUsingListingId,
} from "../../redux/search-slice";
import {
  convertListingObjToListingOnMapObj,
  getListingFromListingArrayGivenId,
  handleGetParkings,
  sortAndFilterParkings,
} from "../../utils/parking-utils";
import { useEffect } from "react";
import { Listing } from "../../types/global.types";
import { RootState } from "../../redux/global-store";
import { NAVBAR_HEIGHT_MOBILE } from "../../components/navbar/navbar-header.component";
import { getURIParams } from "../../utils/browser-utils";
import { callAnalytics } from "../../utils/amplitude-utils";

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

  // fetch listings from backend
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      dispatch(filterSearchResults());
      return;
    } else {
      handleGetParkings()
        .then((res) => {
          const fetchedListings: Listing[] = res.data;
          dispatch(setSearchResults(fetchedListings));
          dispatch(filterSearchResults());
        })
        .catch((error) => {
          console.error("Error fetching listings", error);
        });
    }
  }, []);

  // fetch URI params and set user selected listing if applicable
  useEffect(() => {
    const { new_listing } = getURIParams();
    if (new_listing) {
      dispatch(setUserSelectedListingUsingListingId(new_listing));
    }
  }, [searchResults]);

  // fetch URI params and set user selected listing if applicable
  useEffect(() => {
    const { city } = getURIParams();
    if (city) {
      dispatch(setSearchQuery(city));
      dispatch(filterSearchResults());
    }
  }, [searchResults]);

  const handleListingClickInMap = (id: string) => {
    const selectedListing = getListingFromListingArrayGivenId(
      searchResults,
      id
    );
    dispatch(setUserSelectedListing(selectedListing));
    callAnalytics("listing_icon_clicked_in_map", {
      userSelectedListing: selectedListing,
    });
  };

  const handleMoveEndInMap = (listingIds: string[]) => {
    const listings = listingIds.map((id) =>
      getListingFromListingArrayGivenId(searchResults, id)
    );
    const sortedListings = sortAndFilterParkings(listings);
    dispatch(setListingsRenderedInMap(sortedListings));
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
