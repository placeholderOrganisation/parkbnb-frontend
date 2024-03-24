import { Box, Button, Stack, Typography } from "@mui/material";
import PriceFilter from "./price-filter.component";
import AmenitiesFilter from "./amenities-filter.component";
import StorageTypeFilter from "./storage-type-filter.component";
import VehicleTypeFilter from "./vehicle-type-filter.component";
import DimensionsFilter from "./dimensions-filter.component";
import NumSpacesFilter from "./num-spaces-filter.component";

const Filters = () => {
  return (
    <Stack spacing={2}>
      <PriceFilter />
      <AmenitiesFilter title="Amenities" />
      <Box>
        <Typography variant="h6">Choose storage type</Typography>
        <StorageTypeFilter />
      </Box>
      <Box>
        <Typography variant="h6">Choose vehicle type</Typography>
        <VehicleTypeFilter />
      </Box>
      <Box>
        <Typography variant="h6">Choose dimensions</Typography>
        <DimensionsFilter />
      </Box>
      <Box>
        <Typography variant="h6">Choose number of spaces</Typography>
        <NumSpacesFilter />
      </Box>
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
      >
        <Button variant="contained" color="primary" fullWidth>
          Apply
        </Button>
        <Button variant="outlined" color="primary" fullWidth>
          Reset
        </Button>
      </Stack>
    </Stack>
  );
};

export default Filters;
