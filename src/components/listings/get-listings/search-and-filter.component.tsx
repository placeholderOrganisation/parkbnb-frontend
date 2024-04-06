import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";

import Filters from "../../filters/filter.component";
import SearchContainer from "../../search/search.container";
import RightFullPageDrawer from "../../drawers/full-page-right-drawer.component";
import { useDispatch } from "react-redux";
import {
  filterSearchResults,
  setAmenitiesFilter,
  setDimesionsFilter,
  setMonthlyPriceFilter,
  setNumSpacesFilter,
  setStorageTypeFilter,
  setVehicleTypesFilter,
} from "../../../redux/search-slice";
import {
  amenitiesInitialState,
  dimensionsInitialState,
  monthlyPriceInitialState,
  numSpacesFilterInitialState,
  storageTypeInitialState,
  vehicleTypeInitialState,
} from "../../../redux/search-slice.util";

const SearchAndFilter = () => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  const handleResetFilters = () => {
    // reset filters in redux to default
    dispatch(setAmenitiesFilter(amenitiesInitialState));
    dispatch(setMonthlyPriceFilter(monthlyPriceInitialState));
    dispatch(setStorageTypeFilter(storageTypeInitialState));
    dispatch(setVehicleTypesFilter(vehicleTypeInitialState));
    dispatch(setDimesionsFilter(dimensionsInitialState));
    dispatch(setNumSpacesFilter(numSpacesFilterInitialState));
    // filters are already set in redux to default
    dispatch(filterSearchResults());
    setIsFilterDrawerOpen(false);
  };

  const handleApplyFilters = () => {
    // filters are already set in redux via individual filter components
    dispatch(filterSearchResults());
    setIsFilterDrawerOpen(false);
  };

  return (
    <>
      <SearchContainer
        handleEndAdornmentClick={() => setIsFilterDrawerOpen(true)}
      />
      <RightFullPageDrawer
        open={isFilterDrawerOpen}
        drawerClose={() => setIsFilterDrawerOpen(false)}
        drawerTitle={"Filters"}
        // allowOverflow
        footer={
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{
              my: 3,
              mx: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleApplyFilters}
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleResetFilters}
            >
              Reset
            </Button>
          </Stack>
        }
      >
        <Box
          sx={{
            bgcolor: "grey.100",
            overflow: "auto",
            m: -2,
            p: 2,
          }}
        >
          <Filters />
        </Box>
      </RightFullPageDrawer>
    </>
  );
};

export default SearchAndFilter;
