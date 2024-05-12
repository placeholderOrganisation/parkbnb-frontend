import {
  // Avatar,
  Card,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { ParkingCardLayoutProps } from "./parking-card.component";
import { FILTER_ENUMS, FilterTypes, Listing } from "../../types/global.types";
import {
  formatParkingFilterName,
  getMonthsPassedOrDaysOrHours,
  parseStorageType,
  parseVehicleType,
} from "../../utils/parking-utils";

import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const Amenities = (props: {
  parking: Listing;
  fromParkingCardContainer: boolean;
}) => {
  const { parking, fromParkingCardContainer } = props;
  const vehicle_type = parseVehicleType(parking.filters.vehicle_type);
  const getMonthsPassedOrDaysOrHoursString = getMonthsPassedOrDaysOrHours(
    parking.listed_on
  );
  const parsedlistedOn = `Posted ${getMonthsPassedOrDaysOrHoursString}`;
  const attributesToShow = [
    FILTER_ENUMS.SECURITY_CAMERAS,
    FILTER_ENUMS.FULL_DAY_ACCESS,
  ];
  return (
    <>
      <Stack
        sx={{
          mt: 1,
          width: "max-content",
        }}
        spacing={1}
      >
        <Typography variant="subtitle2">{`Can accomodate: ${vehicle_type}`}</Typography>

        {attributesToShow.map((attribute: string) => {
          return (
            <Stack
              direction="row"
              spacing={1}
              key={attribute}
              sx={{
                alignItems: "center",
              }}
            >
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
        <Stack spacing={1}>
          <Typography variant="subtitle2" color="black">
            {parsedlistedOn}
          </Typography>
          {fromParkingCardContainer ? (
            <Stack direction="row" spacing={0.5}>
              <Typography variant="subtitle2" color="primary">
                View details
              </Typography>
              <ArrowForwardIcon color="primary" fontSize="small" />
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </>
  );
};

const Title = (props: { parking: Listing }) => {
  const { parking } = props;
  const storage_type = parseStorageType(parking.filters.storage_type);
  const isNotScraped = Boolean(parking.is_scraped) === false;
  return (
    <Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mt: 0.5,
        }}
      >
        <Typography variant="body1">${parking.price.monthly}/month</Typography>
        {isNotScraped && (
          <VerifiedIcon fontSize="small" color="info" sx={{ ml: 1 }} />
        )}
      </Stack>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
        }}
      >
        <Typography variant="body2">{storage_type}</Typography>
      </Stack>
    </Stack>
  );
};

const ParkingCardMobile = (props: ParkingCardLayoutProps) => {
  const {
    parking,
    showIcon,
    icon,
    handleIconClick,
    fromParkingCardContainer,
  } = props;

  return (
    <Card
      sx={{
        borderRadius: 4,
      }}
    >
      <CardHeader
        // avatar={<Avatar aria-label="recipe">:)</Avatar>}
        action={
          <IconButton aria-label="settings" onClick={handleIconClick}>
            {showIcon && icon}
          </IconButton>
        }
        subheader={
          <Amenities
            parking={parking}
            fromParkingCardContainer={fromParkingCardContainer}
          />
        }
        title={<Title parking={parking} />}
      />
    </Card>
  );
};

export default ParkingCardMobile;
