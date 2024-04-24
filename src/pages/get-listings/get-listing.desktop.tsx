import { Box, Grid, Stack } from "@mui/material";
import MapComponent from "../../components/map/map.component";
import { GetListingsPageProps } from "../../types/global.types";
import SearchAndFilter from "../../components/listings/get-listings/search-and-filter.component";
import ListviewComponent from "../../components/listings/get-listings/listview/listview.component";

const GetListingsDesktopLayout = (props: GetListingsPageProps) => {
  const { searchResults, handleListingClickInMap, handleMoveEndInMap } = props;

  return (
    <Grid container sx={{
      height: 'inherit',
    }}>
      <Grid item xs={4} sx={{
        height: 'inherit',
      }}>
        <Stack
          spacing={2}
          sx={{
            mt: 2,
            height: 'inherit',
            overflow: 'auto',
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
      <Grid item xs={8}>
        <MapComponent
          listings={searchResults}
          handleListingClick={handleListingClickInMap}
          handleMoveEnd={handleMoveEndInMap}
        />
      </Grid>
    </Grid>
  );
};

export default GetListingsDesktopLayout;
