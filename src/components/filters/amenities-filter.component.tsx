import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { FILTER_ENUMS, FilterTypes } from "../../types/global.types";
import { formatParkingFilterName } from "../../utils/parking-utils";

const parkingFilters: string[] = [
  FILTER_ENUMS.ACCESS_24_7,
  FILTER_ENUMS.EV_CHARGING,
  FILTER_ENUMS.SECURITY_CAMERAS,
  FILTER_ENUMS.HANDICAP_ACCESSIBLE,
];

const AmenitiesFilter = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        {parkingFilters.map((label, index) => (
          <Grid item xs={6} key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  name={`checkbox-${index}`}
                  value="yes"
                />
              }
              label={formatParkingFilterName(label as keyof FilterTypes)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AmenitiesFilter;
