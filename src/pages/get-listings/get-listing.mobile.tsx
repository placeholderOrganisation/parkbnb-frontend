import MapComponent from "../../components/listings/get-listings/Map";
import GetListingBottomDrawer from "../../components/drawers/get-listing-bottom-drawer.component";
import { GetListingsMobilePageProps } from "../../types/global.types";
import { Box, Divider, InputAdornment, TextField } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { useState } from "react";
import RightFullPageDrawer from "../../components/drawers/full-page-right-drawer.component";

const GetListingsMobileLayout = (props: GetListingsMobilePageProps) => {
  const { listings } = props;

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
                <TuneIcon onClick={() => setIsFilterDrawerOpen(true)} />
              </InputAdornment>
            ),
          }}
        />
        <MapComponent listings={listings} />
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
