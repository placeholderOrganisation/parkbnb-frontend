import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import {
  parseDimensionsReturnLabel,
  parseDimensionsReturnLengthAndWidth,
  parseLengthAndWidth,
} from "../../utils/parking-utils";
import {
  DimensionFilterTypes,
  DIMENSIONS_ENUMS,
} from "../../types/global.types";
import { dimensionsInitialState } from "../../redux/search-slice.util";

export const dimesionTypes = Object.keys(DIMENSIONS_ENUMS);

interface DimensionsFilterProps {
  dimensionsInRedux?: { minLength: number; minWidth: number };
  handleDimensionsFilterChange?: (dimensions: {
    minLength: number;
    minWidth: number;
  }) => void;
}

const DimensionsFilter = (props: DimensionsFilterProps) => {
  const { dimensionsInRedux, handleDimensionsFilterChange = () => {} } = props;

  const intialDimensions = dimensionsInRedux || dimensionsInitialState;
  const dimensionLabel = parseLengthAndWidth(
    intialDimensions.minLength,
    intialDimensions.minWidth
  );

  const [dimensions, setDimensions] = useState<string>(dimensionLabel);

  const handleDimensionsChange = (event: SelectChangeEvent) => {
    const value = event.target.value as keyof DimensionFilterTypes;
    const { length, width } = parseDimensionsReturnLengthAndWidth(value);
    setDimensions(value);
    handleDimensionsFilterChange({ minLength: length, minWidth: width });
  };

  return (
    <Box>
      <FormControl
        required
        sx={{
          width: "100%",
        }}
      >
        <InputLabel id="dimension-select-label">
          Length and width of space is
        </InputLabel>
        <Select
          labelId="dimension-select-label"
          id="dimension-select"
          value={dimensions}
          label="Length and width of space is *"
          onChange={handleDimensionsChange}
        >
          {dimesionTypes.map((dimensionType: string) => (
            <MenuItem key={dimensionType} value={dimensionType}>
              {parseDimensionsReturnLabel(
                dimensionType as keyof DimensionFilterTypes
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DimensionsFilter;
