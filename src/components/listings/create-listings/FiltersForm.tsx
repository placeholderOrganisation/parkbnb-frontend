import {
  Box,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState } from "react";

const names = [
  "bike",
  "sedan / suv",
  "pickup truck",
  "boat / RV",
  "commercial truck / trailer",
];

export default function FiltersForm() {
  const [storageType, setStorageType] = useState("");
  const [vehicleType, setVehicleType] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState("");
  const [spacesAvailable, setSpacesAvailable] = useState("");

  const handleStorageTypeChange = (event: SelectChangeEvent) => {
    setStorageType(event.target.value);
  };

  const handleVehicleTypeChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setVehicleType(typeof value === "string" ? value.split(",") : value);
  };

  const handleDimensionsChange = (event: SelectChangeEvent) => {
    setDimensions(event.target.value);
  };

  const handleSpacesAvailableChange = (event: SelectChangeEvent) => {
    setSpacesAvailable(event.target.value);
  };

  return (
    <>
      {/* Checkboxes */}
      <Box
        sx={{
          pt: 5,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Select all that apply to your space
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="security-cameras" value="yes" />
              }
              label="Security cameras"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="access" value="yes" />
              }
              label="24/7 access"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="ev-charging" value="yes" />
              }
              label="EV charging available"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="handicap-accessible" value="yes" />
              }
              label="Handicap accessible"
            />
          </Grid>
        </Grid>
      </Box>
      {/* Dropdown filters */}
      <Box
        sx={{
          pt: 5,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 2,
          }}
        >
          Tell us more about your space
        </Typography>
        <FormControl
          required
          sx={{
            width: "100%",
            mb: 2.5,
          }}
        >
          <InputLabel id="demo-simple-select-required-label">
            Storage type
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={storageType}
            label="Storage type *"
            onChange={handleStorageTypeChange}
          >
            <MenuItem value={"indoor"}>Indoor storage</MenuItem>
            <MenuItem value={"outdoor"}>Outdoor storage</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          required
          sx={{
            width: "100%",
            mb: 2.5,
          }}
        >
          <InputLabel id="demo-simple-select-required-label">
            Your space can accommodate
          </InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            // @ts-ignore
            value={vehicleType}
            onChange={handleVehicleTypeChange}
            input={<OutlinedInput label="Your space can accommodate*" />}
            renderValue={(selected) =>
              Array.isArray(selected) ? selected.join(", ") : selected
            }
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={vehicleType.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          required
          sx={{
            width: "100%",
            mb: 2.5,
          }}
        >
          <InputLabel id="demo-simple-select-required-label">
            Length and width is
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={dimensions}
            label="Length and width is *"
            onChange={handleDimensionsChange}
          >
            <MenuItem value={"length: 20 width: 10"}>
              20' x 10' (one car)
            </MenuItem>
            <MenuItem value={"length: 25 width: 15"}>
              25' x 15' (one pickup)
            </MenuItem>
            <MenuItem value={"length: 20 width: 20"}>
              20' x 20' (two cars)
            </MenuItem>
            <MenuItem value={"length: 40 width: 10"}>40' x 10'</MenuItem>
            <MenuItem value={"length: 50 width: 10"}>50' x 10'</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          required
          sx={{
            width: "100%",
            mb: 2.5,
          }}
        >
          <InputLabel id="demo-simple-select-required-label">
            How many spaces are available?
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={spacesAvailable}
            label="How many spaces are available? *"
            onChange={handleSpacesAvailableChange}
          >
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
            <MenuItem value={4}>Three or more</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
