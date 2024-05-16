import { Box } from "@mui/material";
import { MapComponent } from "../../components/Map/map.component";
import SearchAndFilter from "../../components/listings/get-listings/search-and-filter.component";
import { GetListingsPageProps } from "../../types/global.types";
import ParkingCardContainerForMap from "../../components/listings/get-listings/parking-card-container-for-map.mobile";
import ListviewComponent from "../../components/listings/get-listings/listview/listview.component";
import { NAVBAR_HEIGHT_MOBILE } from "../../components/navbar/navbar-header.component";

const GetListingsMobileLayout = (props: GetListingsPageProps) => {
  const {
    searchQuery,
    searchResults,
    handleMoveEndInMap,
    userSelectedListing,
    handleListingClickInMap,
  } = props;

  return (
    <>
      <Box
        sx={{
          position: "relative",
          maxHeight: `calc(100dvh - ${NAVBAR_HEIGHT_MOBILE}px)`,
        }}
      >
        {/* search bar  */}
        <SearchAndFilter />

        {/* renders if user clicked on a listing in map  */}
        <ParkingCardContainerForMap />

        {/* map  */}
        <MapComponent
          city={searchQuery}
          listings={searchResults}
          userSelectedListing={userSelectedListing}
          handleListingClick={(listingId) => handleListingClickInMap(listingId)}
          handleMoveEnd={(listingIds) => handleMoveEndInMap(listingIds)}
        />
      </Box>

      {/* listview drawer  */}
      <ListviewComponent />
    </>
  );
};

export default GetListingsMobileLayout;
