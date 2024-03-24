import { Box, Typography } from "@mui/material";
import AmenitiesFilter from "../../filters/amenities-filter.component";
import StorageTypeFilter from "../../filters/storage-type-filter.component";
import VehicleTypeFilter from "../../filters/vehicle-type-filter.component";
import DimensionsFilter from "../../filters/dimensions-filter.component";
import NumSpacesFilter from "../../filters/num-spaces-filter.component";

export default function FiltersForm() {
  return (
    <>
      {/* Checkboxes */}
      <AmenitiesFilter title="Select all that apply to your space" />
      {/* Dropdown filters */}
      <Box
        sx={{
          pt: 5,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 2,
          }}
        >
          Tell us more about your space
        </Typography>
        <StorageTypeFilter />
        <VehicleTypeFilter />
        <DimensionsFilter />
        <NumSpacesFilter />
      </Box>
    </>
  );
}
