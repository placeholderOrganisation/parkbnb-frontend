import { Chip, Stack } from "@mui/material";
import { Dayjs } from "dayjs";
import { getMonthsPassedOrDaysOrHours } from "../../utils/parking-utils";

interface ListingCardChipsProps {
  listed_on: Dayjs;
}

const ListingCardChips = (props: ListingCardChipsProps) => {
  const { listed_on } = props;
  const parsedlistedOn = getMonthsPassedOrDaysOrHours(listed_on);
  return (
    <Stack direction="row">
      <Chip label={parsedlistedOn} variant="filled" color="primary" />
    </Stack>
  );
};

export default ListingCardChips;
