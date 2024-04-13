import { Box, Stack, Typography } from "@mui/material";
import AmenitiesFilter from "../../filters/amenities-filter.component";
import StorageTypeFilter from "../../filters/storage-type-filter.component";
import VehicleTypeFilter from "../../filters/vehicle-type-filter.component";
import DimensionsFilter from "../../filters/dimensions-filter.component";
import NumSpacesFilter from "../../filters/num-spaces-filter.component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/global-store";
import { AmenitiesTypeFilterTypes } from "../../../types/global.types";
import {
  setAmenities,
  setDimensions,
  setNumSpaces,
  setStepTwoValidity,
  setStorageType,
  setVehicleTypes,
} from "../../../redux/step-two-slice";

export default function FiltersForm() {
  const dispatch = useDispatch();
  
  const {
    amenities: amenitiesInRedux,
    storageType: storageTypeInRedux,
    vehicleTypes: vehicleTypesInRedux,
    dimensions: dimensionsInRedux,
    numSpaces: numSpacesInRedux,
  } = useSelector((state: RootState) => state.stepTwoForm);

  const updateStepTwoValidity = () => {
    dispatch(setStepTwoValidity());
  };

  const handleAmentiesChange = (updatedAmenities: AmenitiesTypeFilterTypes) => {
    dispatch(setAmenities(updatedAmenities));
    updateStepTwoValidity();
  };

  const handleStorageTypeChange = (storageType: string) => {
    dispatch(setStorageType(storageType));
    updateStepTwoValidity();
  };

  const handleVehicleTypesChange = (vehicleTypes: string) => {
    dispatch(setVehicleTypes(vehicleTypes));
    updateStepTwoValidity();
  };

  const handleDimensionsChange = (dimensions: {
    minLength: number;
    minWidth: number;
  }) => {
    dispatch(setDimensions(dimensions));
    updateStepTwoValidity();
  };

  const handleNumSpacesFilterChange = (numSpaces: number) => {
    dispatch(setNumSpaces(numSpaces));
    updateStepTwoValidity();
  };

  return (
    <>
      {/* Checkboxes */}
      <Stack spacing={1}>
        <Typography variant="h6">
          Select all that apply to your space
        </Typography>
        <AmenitiesFilter
          amenitiesInRedux={amenitiesInRedux}
          handleAmentiFilterChange={handleAmentiesChange}
        />
      </Stack>
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
        <Stack spacing={3}>
          <StorageTypeFilter
            storageTypeInRedux={storageTypeInRedux}
            handleStorageTypeFilterChange={handleStorageTypeChange}
          />
          <VehicleTypeFilter
            vehicleTypesInRedux={vehicleTypesInRedux}
            handleVehicleTypesFilterChange={handleVehicleTypesChange}
          />
          <DimensionsFilter
            dimensionsInRedux={dimensionsInRedux}
            handleDimensionsFilterChange={handleDimensionsChange}
          />
          <NumSpacesFilter
            numSpacesInRedux={numSpacesInRedux}
            handleNumSpacesFilterChange={handleNumSpacesFilterChange}
          />
        </Stack>
      </Box>
    </>
  );
}
