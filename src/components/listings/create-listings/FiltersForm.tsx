import { Box, Stack, Typography } from "@mui/material";
import AmenitiesFilter from "../../filters/amenities-filter.component";
import StorageTypeFilter from "../../filters/storage-type-filter.component";
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
import VehicleTypeFilterContainer from "./filter-form-components/vehicle-type.container";
import DimensionTypeFilterContainer from "./filter-form-components/dimension-type.container";
import { callAnalytics } from "../../../utils/amplitude-utils";
import { useEffect } from "react";

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

  useEffect(() => {
    callAnalytics("filters_section_viewed");
  }, []);

  return (
    <>
      {/* Checkboxes */}
      <Stack spacing={2}>
        <Typography variant="h6">
          Set Amenities
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
          More Information
        </Typography>
        <Stack spacing={3}>
          <StorageTypeFilter
            storageTypeInRedux={storageTypeInRedux}
            handleStorageTypeFilterChange={handleStorageTypeChange}
          />
          <VehicleTypeFilterContainer
            vehicleTypesInRedux={vehicleTypesInRedux}
            handleVehicleTypesFilterChange={handleVehicleTypesChange}
          />
          <DimensionTypeFilterContainer
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
