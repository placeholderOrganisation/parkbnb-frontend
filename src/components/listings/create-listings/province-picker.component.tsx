import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { provincesInCanada } from "../../../types/create-listing-form.types";

interface ProvincePickerProps {
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const ProvincePicker = (props: ProvincePickerProps) => {
  const { handleChange } = props;
  const [province, setProvince] = useState<string>("Ontario");

  const handleProvinceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setProvince(event.target.value as string);
    handleChange(event);
  };

  return (
    <Box>
      <FormControl
        required
        sx={{
          width: "100%",
        }}
      >
        <InputLabel id="province-select-required-label">Province</InputLabel>
        <Select
          labelId="province-select-required-label"
          id="province-select-required"
          name="province"
          value={province}
          label="Province *"
          autoComplete="state-province"
          // @ts-expect-error
          onChange={handleProvinceChange}
        >
          {provincesInCanada.map((province) => (
            <MenuItem key={province} value={province} sx={{ p: 2 }}>
              {province}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProvincePicker;
