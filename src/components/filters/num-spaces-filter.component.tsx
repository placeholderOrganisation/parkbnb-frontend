import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { numSpacesOptions } from "../../types/global.types";
import { numSpacesFilterInitialState } from "../../redux/search-slice.util";

interface NumSpacesFilterProps {
  numSpacesInRedux?: number;
  handleNumSpacesFilterChange?: (numSpaces: number) => void;
}

const NumSpacesFilter = (props: NumSpacesFilterProps) => {
  const { numSpacesInRedux, handleNumSpacesFilterChange = () => {} } = props;
  const initialNumSpaceLabel = numSpacesInRedux || numSpacesFilterInitialState;

  const [numSpacesAvailable, setNumSpacesAvailable] = useState(initialNumSpaceLabel);

  const handleSpacesAvailableChange = (event: SelectChangeEvent) => {
    const numSpaces = parseInt(event.target.value);
    setNumSpacesAvailable(numSpaces);
    handleNumSpacesFilterChange(numSpaces);
  };

  return (
    <Box>
      <FormControl
        required
        sx={{
          width: "100%",
        }}
      >
        <InputLabel id="num-spaces-select-required-label">
          How many spaces are available?
        </InputLabel>
        <Select
          labelId="num-spaces-select-required-label"
          id="num-spaces-select-required"
          // @ts-expect-error
          value={numSpacesAvailable}
          label="How many spaces are available? *"
          onChange={handleSpacesAvailableChange}
        >
          {numSpacesOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default NumSpacesFilter;
