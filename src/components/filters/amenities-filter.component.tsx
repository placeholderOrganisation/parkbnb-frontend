import { useState } from "react";
import { Box, Checkbox, FormControlLabel, Grid } from "@mui/material";
import {
  AmenitiesTypeFilterTypes,
  FILTER_ENUMS,
} from "../../types/global.types";
import { formatParkingFilterName } from "../../utils/parking-utils";
import { amenitiesInitialState } from "../../redux/search-slice.util";

// using this list to manage the order in which amenities are displayed
const parkingFilters: string[] = [
  FILTER_ENUMS.ACCESS_24_7,
  FILTER_ENUMS.EV_CHARGING,
  FILTER_ENUMS.SECURITY_CAMERAS,
  FILTER_ENUMS.HANDICAP_ACCESSIBLE,
];

interface AmenitiesFilterProps {
  amenitiesInRedux?: AmenitiesTypeFilterTypes;
  handleAmentiFilterChange?: (
    updatedAmenities: AmenitiesTypeFilterTypes
  ) => void;
}

const AmenitiesFilter = (props: AmenitiesFilterProps) => {
  const { amenitiesInRedux = amenitiesInitialState, handleAmentiFilterChange = () => {} } = props;

  const [amenities, setAmenities] = useState<AmenitiesTypeFilterTypes>(
    amenitiesInRedux
  );

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const updatedAmenities = {
      ...amenities,
      [name]: checked,
    };
    setAmenities(updatedAmenities);
    handleAmentiFilterChange(updatedAmenities);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {parkingFilters.map((label, index) => (
          <Grid item xs={6} key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  name={label}
                  value="yes"
                  checked={
                    amenities[label as keyof AmenitiesTypeFilterTypes] || false
                  }
                  onChange={handleCheckboxChange}
                />
              }
              label={formatParkingFilterName(
                label as keyof AmenitiesTypeFilterTypes
              )}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AmenitiesFilter;
