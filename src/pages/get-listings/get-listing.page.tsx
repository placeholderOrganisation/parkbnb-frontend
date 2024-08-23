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
import { setMapCoords } from "../../redux/map-slice";
import { handleAutocomplete } from "../../utils/geo-coding.utils";
import { seoContent } from "../../constants";
import Head from "../../components/seo/head.component";
import { generateSEOForListingPage } from "../../utils/seo-utils";

const GetListing = () => {
  const dispatch = useDispatch();
  const isDesktopView = isDesktop();
  const Layout = isDesktopView
    ? GetListingsDesktopLayout
    : GetListingsMobileLayout;

  const { listingsPage: listingsPageHeaderDetails } = seoContent;
  const {
    pageTitle,
    pageDescription,
    pageImage,
    pageCanonicalUrl,
  } = listingsPageHeaderDetails;
  const {
    pageTitle: generatedPageTitle,
    pageDescription: generatedPageDescription,
  } = generateSEOForListingPage();

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
    const { city, address, postalCode, q } = getURIParams();
    if (city) {
      dispatch(setSearchQuery(city));
      dispatch(filterSearchResults());
    }
    let query = "";
    if (address) {
      query = address;
    } else if (postalCode) {
      query = postalCode;
    } else if (q) {
      query = q;
    }
    handleAutocomplete(query).then((res) => {
      const { results } = res;
      if (!results || results.length === 0) {
        return;
      }
      const firstResult = results[0];
      dispatch(
        setMapCoords({
          lat: firstResult.center.lat,
          lng: firstResult.center.lng,
          zoom: 14,
        })
      );
      dispatch(setSearchQuery(firstResult.text));
    });
  }, [searchResults]);

  const handleListingClickInMap = (id: string) => {
    const selectedListing = getListingFromListingArrayGivenId(
      searchResults,
      id
    );
    dispatch(setUserSelectedListing(selectedListing));
    dispatch(
      setMapCoords({
        lat: selectedListing?.address.lat,
        lng: selectedListing?.address.lng,
        zoom: 13,
      })
    );
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
    <>
      <Head
        pageTitle={generatedPageTitle || pageTitle}
        pageDescription={generatedPageDescription || pageDescription}
        pageImage={pageImage}
        pageCanonicalUrl={pageCanonicalUrl}
      />
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
    </>
  );
};

export default GetListing;
