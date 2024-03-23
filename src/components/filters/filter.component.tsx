import { Stack } from "@mui/material";
import PriceFilter from "./price-filter.component";

const Filters = () => {
  return (
    <Stack spacing={2}>
      <PriceFilter />
      {/* <CategoryFilter /> */}
      {/* <LocationFilter /> */}
      {/* <DateFilter /> */}
    </Stack>
  );
};

export default Filters;
