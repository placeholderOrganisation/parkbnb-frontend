import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { ParkingCardProps } from "./parking-card.component";
import { Listing } from "../../types/global.types";
import { vehicleTypeToDimensions } from "../../utils/create-listing-form.utils";
import { VehicleTypeToDimensions } from "../../types/create-listing-form.types";

const Amenities = (props: { parking: Listing }) => {
  const { parking } = props;
  const vehicle_type = parseVehicleType(parking.filters.vehicle_type);
  return (
    <>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          mt: 1,
        }}
      >
        <Typography variant="subtitle2">Security cameras</Typography>
        <Typography variant="subtitle2">24/7 Access</Typography>
      </Stack>
      <Typography variant="subtitle2">{`Can accomodate: ${vehicle_type}`}</Typography>
    </>
  );
};

const Title = (props: { parking: Listing }) => {
  const { parking } = props;
  const storage_type = parseStorageType(parking.filters.storage_type);
  return (
    <Stack>
      <Typography variant="body1">{storage_type}</Typography>
      <Stack direction="row" spacing={1}>
        <Typography variant="body2">${parking.price.monthly}/month</Typography>
        <Typography variant="body2">•</Typography>
        <Typography variant="body2">${parking.price.daily}/day</Typography>
      </Stack>
    </Stack>
  );
};

const parseStorageType = (storage_type: string) => {
  if (storage_type === "outdoor") {
    return "Outdoor storage";
  } else if (storage_type === "indoor") {
    return "Indoor storage";
  }
  return "";
};

const parseVehicleType = (vehicle_type: keyof VehicleTypeToDimensions) => {

  if (!vehicleTypeToDimensions[vehicle_type]) {
    return vehicle_type;
  }

  return vehicleTypeToDimensions[vehicle_type];
};

const ParkingCardMobile = (props: ParkingCardProps) => {
  const { parking } = props;

  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="recipe">:)</Avatar>}
        action={
          <IconButton aria-label="settings">
            <FavoriteBorderOutlinedIcon />
          </IconButton>
        }
        subheader={<Amenities parking={parking} />}
        title={<Title parking={parking} />} // Modified line
      />
    </Card>
  );
};

export default ParkingCardMobile;
