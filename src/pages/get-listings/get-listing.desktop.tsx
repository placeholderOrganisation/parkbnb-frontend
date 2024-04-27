import { Box, Grid, Stack } from "@mui/material";
import MapComponent from "../../components/map/map.component.tsx";
import { GetListingsPageProps } from "../../types/global.types";
import SearchAndFilter from "../../components/listings/get-listings/search-and-filter.component";
import ListviewComponent from "../../components/listings/get-listings/listview/listview.component";
import ParkingCardContainerForMap from "../../components/listings/get-listings/parking-card-container-for-map.mobile";

const GetListingsDesktopLayout = (props: GetListingsPageProps) => {
  const {
    searchQuery,
    searchResults,
    handleListingClickInMap,
    handleMoveEndInMap,
    userSelectedListing,
  } = props;

  return (
    <Grid
      container
      sx={{
        height: "inherit",
      }}
    >
      <Grid
        item
        xs={4}
        sx={{
          height: "inherit",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            pt: 2,
            height: "inherit",
            overflow: "auto",
          }}
        >
          {/* search bar  */}
          <Box
            sx={{
              mx: `16px !important`,
            }}
          >
            <SearchAndFilter />
          </Box>
          <ListviewComponent />
        </Stack>
      </Grid>

      <Grid
        item
        xs={8}
        sx={{
          position: "relative",
        }}
      >
        <MapComponent
          city={searchQuery}
          listings={searchResults}
          userSelectedListing={userSelectedListing}
          handleListingClick={handleListingClickInMap}
          handleMoveEnd={handleMoveEndInMap}
        />
        {/* renders if user clicked on a listing in map  */}
        <ParkingCardContainerForMap />
      </Grid>
    </Grid>
  );
};

export default GetListingsDesktopLayout;
