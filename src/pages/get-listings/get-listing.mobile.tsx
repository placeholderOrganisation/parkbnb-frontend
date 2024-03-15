import { useState } from "react";
import MapComponent from "../../components/listings/get-listings/Map";
import GetListingBottomDrawer from "../../components/listings/get-listings/get-listing-bottom-drawer.component";
import { GetListingsPageProps } from "../../types/global.types";
import { Box, Divider, InputAdornment, TextField } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import RightFullPageDrawer from "../../components/drawers/full-page-right-drawer.component";
import ParkingCardContainerForMap from "../../components/listings/get-listings/parking-card-container-for-map.mobile";

const GetListingsMobileLayout = (props: GetListingsPageProps) => {
  const { searchResults, handleMoveEndInMap, handleListingClickInMap } = props;

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search for a city"
          variant="outlined"
          sx={{
            position: "absolute",
            top: 16,
            left: 0,
            mx: 2,
            zIndex: 100,
            width: "calc(100% - 32px)",
            bgcolor: "white",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Divider
                  orientation="vertical"
                  // flexItem
                  sx={{
                    height: 40,
                    mx: 1,
                  }}
                />
                <TuneIcon
                  onClick={() => {
                    setIsFilterDrawerOpen(true);
                  }}
                />
              </InputAdornment>
            ),
          }}
        />

        {/* ListingPopup renders if user clicked on a listing in map  */}
        <ParkingCardContainerForMap />

        <MapComponent
          listings={searchResults}
          handleListingClick={(listingOnMap) =>
            handleListingClickInMap(listingOnMap)
          }
          handleMoveEnd={(listingsOnMap) => handleMoveEndInMap(listingsOnMap)}
        />
      </Box>
      <GetListingBottomDrawer />
      <RightFullPageDrawer
        anchor="right"
        open={isFilterDrawerOpen}
        drawerClose={() => setIsFilterDrawerOpen(false)}
        drawerOpen={() => setIsFilterDrawerOpen(true)}
      >
        filters
      </RightFullPageDrawer>
    </>
  );
};

export default GetListingsMobileLayout;
