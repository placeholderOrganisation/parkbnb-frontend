import MoreInfoDrawer from "../../../drawers/more-info.bottom-drawer";
import { Box, Stack, Typography } from "@mui/material";
import VehicleTypeFilter from "../../../filters/vehicle-type-filter.component";

interface VehicleTypeFilterContainerProps {
  vehicleTypesInRedux: string;
  handleVehicleTypesFilterChange: (vehicleTypes: string) => void;
}

const VehicleTypeFilterContainer = (props: VehicleTypeFilterContainerProps) => {
  const { vehicleTypesInRedux, handleVehicleTypesFilterChange } = props;
  return (
    <Stack spacing={1}>
      <VehicleTypeFilter
        vehicleTypesInRedux={vehicleTypesInRedux}
        handleVehicleTypesFilterChange={handleVehicleTypesFilterChange}
      />
      <MoreInfoDrawer label="Learn more about setting vehicle types" location="vehicle_filter_create_listing">
        <Stack spacing={1}>
          <Box>
            <Typography variant="body1">
              Select the{" "}
              <Typography
                component="span"
                variant="body2"
                sx={{ fontWeight: "bold" }}
              >
                largest
              </Typography>{" "}
              vehicle that you want in your space.
            </Typography>
          </Box>
          <Typography variant="body2">
            When users filter by a vehicle type we include listings that 
            can accommodate vehicles of that type or smaller.
          </Typography>
          <Typography variant="body2">
            For example, if you set the vehicle type to "sedan / suv", your listing
            will be included in search results for users looking for spaces that
            can accommodate "sedan / suv" or smaller vehicles such as a "bike".
          </Typography>
        </Stack>
      </MoreInfoDrawer>
    </Stack>
  );
};

export default VehicleTypeFilterContainer;
