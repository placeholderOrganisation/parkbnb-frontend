import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { storageTypeInitialState } from "../../redux/search-slice.util";

const StorageTypesOptions = [
  {
    value: "indoor",
    label: "garage / covered lot",
  },
  {
    value: "outdoor",
    label: "driveway / uncovered lot",
  },
];

interface StorageTypeFilterProps {
  storageTypeInRedux?: string;
  handleStorageTypeFilterChange?: (storageType: string) => void;
  disabled?: boolean;
}

const StorageTypeFilter = (props: StorageTypeFilterProps) => {
  const {
    storageTypeInRedux,
    handleStorageTypeFilterChange = () => {},
    disabled = false,
  } = props;

  const [storageType, setStorageType] = useState(storageTypeInRedux || storageTypeInitialState);
  const handleStorageTypeChange = (event: SelectChangeEvent) => {
    setStorageType(event.target.value);
    handleStorageTypeFilterChange(event.target.value);
  };
  return (
    <Box>
      <FormControl
        required
        sx={{
          width: "100%",
        }}
        disabled={disabled}
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
