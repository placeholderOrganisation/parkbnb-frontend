import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

const numSpacesOptions = [
  {
    value: 1,
    label: "One",
  },
  {
    value: 2,
    label: "Two",
  },
  {
    value: 3,
    label: "Three",
  },
  {
    value: 4,
    label: "Three or more",
  },
];

const NumSpacesFilter = () => {
  const [spacesAvailable, setSpacesAvailable] = useState("");

  const handleSpacesAvailableChange = (event: SelectChangeEvent) => {
    setSpacesAvailable(event.target.value);
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
          value={spacesAvailable}
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
