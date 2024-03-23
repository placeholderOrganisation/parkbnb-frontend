import { Stack } from "@mui/material";
import PriceFilter from "./price-filter.component";
import AmenitiesFilter from "./amenities-filter.component";

const Filters = () => {
  return (
    <Stack spacing={2}>
      <PriceFilter />
      <AmenitiesFilter title="Amenities" />
      {/* <LocationFilter /> */}
      {/* <DateFilter /> */}
    </Stack>
  );
};

export default Filters;
