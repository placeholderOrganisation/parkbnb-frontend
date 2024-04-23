import { DimensionFilterTypes, FILTER_ENUMS, FilterTypes } from "../../types/global.types";
import {
  formatParkingFilterName,
  parseDimensionsReturnLabel,
  parseLengthAndWidth,
  parseVehicleType,
} from "../../utils/parking-utils";
import { Box, Stack, Typography } from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

interface ListingAmenitiesProps {
  filters: FilterTypes;
}

const ListingFilters = (props: ListingAmenitiesProps) => {
  const { filters } = props;
  const { length, width } = filters;
  const vehicle_type = parseVehicleType(filters.vehicle_type);
  const parsedLengthAndWidth = parseLengthAndWidth(length, width);
  const parsedDimensions = parseDimensionsReturnLabel(parsedLengthAndWidth as keyof DimensionFilterTypes);

  const attributesToShow = [
    FILTER_ENUMS.HANDICAP_ACCESSIBLE,
    FILTER_ENUMS.SECURITY_CAMERAS,
    FILTER_ENUMS.FULL_DAY_ACCESS,
    FILTER_ENUMS.EV_CHARGING,
  ];
  return (
    <>
      <Stack
        sx={{
          mt: 1,
          width: "max-content",
        }}
        spacing={1}
      >
        <Typography variant="h5">Amenities</Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1">Can accomodate:</Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              ml: 0.5,
            }}
          >
            {vehicle_type}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1">Dimensions:</Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              ml: 0.5,
            }}
          >
            {parsedDimensions}
          </Typography>
        </Box>

        {attributesToShow.map((attribute: string) => {
          return (
            <Stack
              direction="row"
              spacing={1}
              key={attribute}
              sx={{
                alignItems: "center",
              }}
            >
              {filters[attribute as keyof FilterTypes] ? (
                <CheckOutlinedIcon fontSize="small" color="success" />
              ) : (
                <ClearOutlinedIcon fontSize="small" color="error" />
              )}
              <Typography variant="subtitle1">
                {formatParkingFilterName(attribute as keyof FilterTypes)}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </>
  );
};

export default ListingFilters;
