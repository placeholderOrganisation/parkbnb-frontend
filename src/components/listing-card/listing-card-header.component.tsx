import { Dayjs } from "dayjs";
import { Typography } from "@mui/material";
import { getMonthsPassedOrDaysOrHours } from "../../utils/parking-utils";


interface ListingCardHeaderProps {
  address: {
    city: string;
    state: string;
  };
  listed_on: Dayjs;
  spaces: number;
  storage_type: string;
}

const ListingCardHeader = (props: ListingCardHeaderProps) => {
  const { address, listed_on, spaces, storage_type } = props;
  const { city, state } = address;

  let parsedHeading = `${spaces} ${storage_type} parking spot`;
  if (spaces > 1) {
    parsedHeading = `${spaces} ${storage_type} parking spots`;
  }

  let subheading = `${city}, ${state}`;
  if (city !== "null" && state !== "null") {
    subheading = `${city}, ${state}`;
  } else if (city !== "null" && state === "null") {
    subheading = city;
  } else if (city === "null" && state !== "null") {
    subheading = state;
  }

  const parsedlistedOn = getMonthsPassedOrDaysOrHours(listed_on);
  return (
    <>
      <Typography variant="h4">{parsedHeading}</Typography>
      <Typography
        variant="h5"
        sx={{
          color: "text.secondary",
          textTransform: "capitalize",
        }}
      >
        {subheading}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {parsedlistedOn}
      </Typography>
    </>
  );
};

export default ListingCardHeader;
