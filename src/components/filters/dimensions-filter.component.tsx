import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { parseDimensions } from "../../utils/parking-utils";
import {
  DimensionFilterTypes,
  DIMENSIONS_ENUMS,
} from "../../types/global.types";

export const dimesionTypes = Object.keys(DIMENSIONS_ENUMS);

const DimensionsFilter = () => {
  const [dimensions, setDimensions] = useState("");
  const handleDimensionsChange = (event: SelectChangeEvent) => {
    setDimensions(event.target.value);
  };

  return (
    <Box>
      <FormControl
        required
        sx={{
          width: "100%",
        }}
      >
        <InputLabel id="dimension-select-label">Length and width of space is</InputLabel>
        <Select
          labelId="dimension-select-label"
          id="dimension-select"
          value={dimensions}
          label="Length and width of space is *"
          onChange={handleDimensionsChange}
        >
          {dimesionTypes.map((dimension: string) => (
            <MenuItem key={dimension} value={dimension}>
              {parseDimensions(dimension as keyof DimensionFilterTypes)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DimensionsFilter;
