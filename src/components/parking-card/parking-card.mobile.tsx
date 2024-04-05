import {
  // Avatar,
  Card,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import {
  ParkingCardLayoutProps,
} from "./parking-card.component";
import { FILTER_ENUMS, FilterTypes, Listing } from "../../types/global.types";
import {
  formatParkingFilterName,
  getMonthsPassedOrDaysOrHours,
  parseStorageType,
  parseVehicleType,
} from "../../utils/parking-utils";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedIcon from "@mui/icons-material/Verified";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useDispatch } from "react-redux";
import { setUserSelectedListing } from "../../redux/search-slice";

const Amenities = (props: { parking: Listing }) => {
  const { parking } = props;
  const vehicle_type = parseVehicleType(parking.filters.vehicle_type);
  const listed_on = getMonthsPassedOrDaysOrHours(parking.listed_on);
  const attributesToShow = [FILTER_ENUMS.SECURITY_CAMERAS, FILTER_ENUMS.ACCESS_24_7];
  return (
    <>
      <Stack
        sx={{
          mt: 1,
          width: "max-content",
        }}
      >
        <Typography variant="subtitle2">{`Can accomodate: ${vehicle_type}`}</Typography>

        {attributesToShow.map((attribute: string) => {
          return (
            <Stack direction="row" spacing={1} key={attribute}>
              {parking.filters[attribute as keyof FilterTypes] ? (
                <CheckOutlinedIcon fontSize="small" color="success" />
              ) : (
                <ClearOutlinedIcon fontSize="small" color="error" />
              )}
              <Typography variant="subtitle2">
                {formatParkingFilterName(attribute as keyof FilterTypes)}
              </Typography>
            </Stack>
          );
        })}
        <Typography variant="subtitle2" color="black">
          {listed_on}
        </Typography>
      </Stack>
    </>
  );
};

const Title = (props: { parking: Listing }) => {
  const { parking } = props;
  const storage_type = parseStorageType(parking.filters.storage_type);
  return (
    <Stack>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
        }}
      >
        <Typography variant="body1">{storage_type}</Typography>
        <VerifiedIcon fontSize="small" color="info" sx={{ ml: 1 }} />
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mt: 0.5,
        }}
      >
        <Typography variant="body2">${parking.price.monthly}/month</Typography>
        <Typography variant="body2">•</Typography>
        <Typography variant="body2">${parking.price.daily}/day</Typography>
      </Stack>
    </Stack>
  );
};

const ParkingCardMobile = (props: ParkingCardLayoutProps) => {
  const { parking, showIcon } = props;

  const dispatch = useDispatch();

  const closeParkingCard = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(setUserSelectedListing(null));
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
      }}
    >
      <CardHeader
        // avatar={<Avatar aria-label="recipe">:)</Avatar>}
        action={
          <IconButton aria-label="settings" onClick={closeParkingCard}>
            {showIcon && <CloseIcon />}
          </IconButton>
        }
        subheader={<Amenities parking={parking} />}
        title={<Title parking={parking} />}
      />
    </Card>
  );
};

export default ParkingCardMobile;
