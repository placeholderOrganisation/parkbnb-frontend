import { Box } from "@mui/material";
import MapComponent from "../../components/listings/get-listings/Map";
import SearchAndFilter from "../../components/listings/get-listings/search-and-filter.component";
import { GetListingsPageProps } from "../../types/global.types";
import GetListingBottomDrawer from "../../components/listings/get-listings/get-listing-bottom-drawer.component";
import ParkingCardContainerForMap from "../../components/listings/get-listings/parking-card-container-for-map.mobile";


const GetListingsMobileLayout = (props: GetListingsPageProps) => {
  const { searchResults, handleMoveEndInMap, handleListingClickInMap } = props;

  return (
    <>
      <Box
        sx={{
          position: "relative",
        }}
      >
        {/* search bar  */}
        <SearchAndFilter />

        {/* renders if user clicked on a listing in map  */}
        <ParkingCardContainerForMap />

        {/* map  */}
        <MapComponent
          listings={searchResults}
          handleListingClick={(listingId) => handleListingClickInMap(listingId)}
          handleMoveEnd={(listingIds) => handleMoveEndInMap(listingIds)}
        />
      </Box>

      {/* listview drawer  */}
      <GetListingBottomDrawer />
    </>
  );
};

export default GetListingsMobileLayout;
