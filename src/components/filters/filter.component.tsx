import { Box, Button, Stack, Typography } from "@mui/material";
import PriceFilter from "./price-filter.component";
import AmenitiesFilter from "./amenities-filter.component";
import StorageTypeFilter from "./storage-type-filter.component";
import VehicleTypeFilter from "./vehicle-type-filter.component";
import DimensionsFilter from "./dimensions-filter.component";
import NumSpacesFilter from "./num-spaces-filter.component";

const filtersOptionsToRender = [
  {
    title: "Amenities",
    component: <AmenitiesFilter />,
  },
  {
    title: "Price",
    component: <PriceFilter />,
  },
  {
    title: "Storage type",
    component: <StorageTypeFilter />,
  },
  {
    title: "Vehicle type",
    component: <VehicleTypeFilter />,
  },
  {
    title: "Dimensions",
    component: <DimensionsFilter />,
  },
  {
    title: "Number of spaces",
    component: <NumSpacesFilter />,
  },
];

const Filters = () => {
  return (
    <Stack spacing={3}>
      {filtersOptionsToRender.map((filterOption) => (
        <Stack spacing={1.5} key={filterOption.title}>
          <Typography variant="h6">{filterOption.title}</Typography>
          {filterOption.component}
        </Stack>
      ))}
      <Box sx={{pb: 10}} />
    </Stack>
  );
};

export default Filters;
