import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

const StorageTypesOptions = [
  {
    value: "indoor",
    label: "Indoor storage",
  },
  {
    value: "outdoor",
    label: "Outdoor storage",
  },
];

const StorageTypeFilter = () => {
  const [storageType, setStorageType] = useState("");
  const handleStorageTypeChange = (event: SelectChangeEvent) => {
    setStorageType(event.target.value);
  };
  return (
    <Box>
      <FormControl
        required
        sx={{
          width: "100%",
          mb: 2.5,
        }}
      >
        <InputLabel id="storage-type-select-required-label">
          Storage type
        </InputLabel>
        <Select
          labelId="storage-type-select-required-label"
          id="storage-type-select-required"
          value={storageType}
          label="Storage type *"
          onChange={handleStorageTypeChange}
        >
          {StorageTypesOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default StorageTypeFilter;
