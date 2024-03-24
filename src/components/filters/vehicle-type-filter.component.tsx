import { useState } from "react";
import {
  Box,
  Checkbox,
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

const VehicleTypeFilter = () => {
  const [vehicleType, setVehicleType] = useState<string[]>([]);
  const handleVehicleTypeChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setVehicleType(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <Box>
      <FormControl
        required
        sx={{
          width: "100%",
        }}
      >
        <InputLabel id="vehicle-type-select-label">
          Your space can accommodate
        </InputLabel>
        <Select
          labelId="vehicle-type-select-label"
          id="vehicle-type-select"
          multiple
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
              <Checkbox checked={vehicleType.indexOf(name) > -1} />
              <ListItemText
                primary={parseVehicleType(
                  name as keyof VehicleTypeFilterTypes
                )}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default VehicleTypeFilter;
