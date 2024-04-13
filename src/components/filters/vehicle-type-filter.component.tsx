import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { parseVehicleType } from "../../utils/parking-utils";
import {
  VEHICLE_TYPE_ENUMS,
  VehicleTypeFilterTypes,
} from "../../types/global.types";

export const vehicleTypes = Object.keys(VEHICLE_TYPE_ENUMS);

interface VehicleTypeFilterProps {
  vehicleTypesInRedux?: string;
  handleVehicleTypesFilterChange?: (vehicleTypes: string) => void;
  disabled?: boolean;
}

const VehicleTypeFilter = (props: VehicleTypeFilterProps) => {
  const {
    vehicleTypesInRedux,
    handleVehicleTypesFilterChange = () => {},
    disabled = false,
  } = props;
  const [vehicleType, setVehicleType] = useState(vehicleTypesInRedux);
  const handleVehicleTypeChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setVehicleType(value);
    handleVehicleTypesFilterChange(value);
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
        <InputLabel id="vehicle-type-select-label">
          Your space can accommodate
        </InputLabel>
        <Select
          labelId="vehicle-type-select-label"
          id="vehicle-type-select"
          // @ts-ignore
          value={vehicleType}
          onChange={handleVehicleTypeChange}
          input={<OutlinedInput label="Your space can accommodate*" />}
          renderValue={(selected) =>
            Array.isArray(selected) ? selected.join(", ") : selected
          }
        >
          {vehicleTypes.map((name) => (
            <MenuItem key={name} value={name}>
              <ListItemText
                primary={parseVehicleType(name as keyof VehicleTypeFilterTypes)}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default VehicleTypeFilter;
