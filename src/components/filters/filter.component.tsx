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
import {
  setAmenitiesFilter,
  setDimesionsFilter,
  setMonthlyPriceFilter,
  setNumSpacesFilter,
  setStorageTypeFilter,
  setVehicleTypesFilter,
} from "../../redux/search-slice";

const pricingFilterFields = [
  {
    id: "minimum-price",
    helperText: "min price",
    helperTextLabelId: "min-price-input",
  },
  {
    id: "maximum-price",
    helperText: "max price",
    helperTextLabelId: "max-price-input",
  },
];

const Filters = () => {
  const dispatch = useDispatch();

  const {
    amenities: amenitiesInRedux,
    price: priceInRedux,
    storageType: storageTypeInRedux,
    vehicleTypes: vehicleTypesInRedux,
    dimensions: dimensionsInRedux,
    numSpaces: numSpacesInRedux,
  } = useSelector((state: RootState) => state.search.filters);

  const handleAmentiFilterChange = (
    updatedAmenities: AmenitiesTypeFilterTypes
  ) => {
    dispatch(setAmenitiesFilter(updatedAmenities));
  };

  const handleMonthlyPriceFilterChange = (
    minPrice: number,
    maxPrice: number
  ) => {
    dispatch(setMonthlyPriceFilter({ minPrice, maxPrice }));
  };

  const handleStorageTypeFilterChange = (storageType: string) => {
    dispatch(setStorageTypeFilter(storageType));
  };

  const handleVehicleTypesFilterChange = (vehicleTypes: string) => {
    dispatch(setVehicleTypesFilter(vehicleTypes));
  };

  const handleDimensionsFilterChange = (dimensions: {
    minLength: number;
    minWidth: number;
  }) => {
    dispatch(setDimesionsFilter(dimensions));
  };

  const handleNumSpacesFilterChange = (numSpaces: number) => {
    dispatch(setNumSpacesFilter(numSpaces));
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
      title: "Monthly price",
      component: (
        <PriceFilter
          pricingFilterFields={pricingFilterFields}
          priceInRedux={priceInRedux}
          handleMonthlyPriceFilterChange={handleMonthlyPriceFilterChange}
        />
      ),
    },
    {
      title: "Storage type",
      component: (
        <StorageTypeFilter
          storageTypeInRedux={storageTypeInRedux}
          handleStorageTypeFilterChange={handleStorageTypeFilterChange}
        />
      ),
    },
    {
      title: "Vehicle type",
      component: (
        <VehicleTypeFilter
          vehicleTypesInRedux={vehicleTypesInRedux}
          handleVehicleTypesFilterChange={handleVehicleTypesFilterChange}
        />
      ),
    },
    {
      title: "Dimensions",
      component: (
        <DimensionsFilter
          dimensionsInRedux={dimensionsInRedux}
          handleDimensionsFilterChange={handleDimensionsFilterChange}
        />
      ),
    },
    {
      title: "Number of spaces",
      component: (
        <NumSpacesFilter
          numSpacesInRedux={numSpacesInRedux}
          handleNumSpacesFilterChange={handleNumSpacesFilterChange}
        />
      ),
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
    </Stack>
  );
};

export default Filters;
