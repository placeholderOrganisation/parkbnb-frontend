import MapComponent from "../../components/listings/get-listings/Map";
import GetListingBottomDrawer from "../../components/listings/get-listings/get-listing-bottom-drawer.component";
import { GetListingsMobilePageProps, Listing } from "../../types/global.types";
import { Box, Divider, InputAdornment, TextField } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { useState } from "react";
import RightFullPageDrawer from "../../components/drawers/full-page-right-drawer.component";
import {
  setUserSelectedListing,
  setListingsRenderedInMap,
} from "../../redux/search-slice";
import { useDispatch } from "react-redux";
import ListingPopup from "../../components/listings/get-listings/ListingPopup.mobile";

const GetListingsMobileLayout = (props: GetListingsMobilePageProps) => {
  const { listings } = props;
  const dispatch = useDispatch();

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const handleListingClickInMap = (listing: Listing) => {
    dispatch(setUserSelectedListing(listing));
  };

  const handleMoveEndInMap = (listings: Listing[]) => {
    dispatch(setListingsRenderedInMap(listings));
  };

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
        <ListingPopup />

        <MapComponent
          listings={listings}
          handleListingClick={(listing) => handleListingClickInMap(listing)}
          handleMoveEnd={(listings) => handleMoveEndInMap(listings)}
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
