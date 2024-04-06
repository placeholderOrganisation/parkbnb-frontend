import { Box, Stack, Typography } from "@mui/material";
import PriceFilter from "./price-filter.component";
import AmenitiesFilter from "./amenities-filter.component";
import StorageTypeFilter from "./storage-type-filter.component";
import VehicleTypeFilter from "./vehicle-type-filter.component";
import DimensionsFilter from "./dimensions-filter.component";
import NumSpacesFilter from "./num-spaces-filter.component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/global-store";
import { AmenitiesTypeFilterTypes } from "../../types/global.types";
import { setAmenitiesFilter } from "../../redux/search-slice";

const Filters = () => {
  const dispatch = useDispatch();

  const amenitiesInRedux = useSelector(
    (state: RootState) => state.search.filters.amenities
  );

  const handleAmentiFilterChange = (
    updatedAmenities: AmenitiesTypeFilterTypes
  ) => {
    dispatch(setAmenitiesFilter(updatedAmenities));
  };

  const filtersOptionsToRender = [
    {
      title: "Amenities",
      component: (
        <AmenitiesFilter
          amenitiesInRedux={amenitiesInRedux}
          handleAmentiFilterChange={handleAmentiFilterChange}
        />
      ),
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

  return (
    <Stack spacing={3}>
      {filtersOptionsToRender.map((filterOption) => (
        <Stack spacing={1.5} key={filterOption.title}>
          <Typography variant="h6">{filterOption.title}</Typography>
          {filterOption.component}
        </Stack>
      ))}
      <Box sx={{ pb: 10 }} />
    </Stack>
  );
};

export default Filters;
