import { Dayjs } from "dayjs";
import { getMonthsPassedOrDaysOrHours } from "../../utils/parking-utils";
import { isDesktop } from "../../utils/display-utils";
import ListingCardHeaderMobile from "./listing-card-header/listing-card-header.mobile";
import ListingCardHeaderDesktop from "./listing-card-header/listing-card-header.desktop";

interface ListingCardHeaderProps {
  address: {
    city: string;
    state: string;
  };
  listed_on: Dayjs;
  spaces: number;
  storage_type: string;
  shouldShowEditListingOption?: boolean;
}

export interface ListingCardHeaderLayoutProps {
  parsedHeading: string;
  subheading: string;
  parsedlistedOn: string;
  shouldShowEditListingOption?: boolean;
}

const ListingCardHeader = (props: ListingCardHeaderProps) => {
  const { address, listed_on, spaces, storage_type, shouldShowEditListingOption = false } = props;
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

  const getMonthsPassedOrDaysOrHoursString = getMonthsPassedOrDaysOrHours(listed_on);
  const parsedlistedOn = `Posted ${getMonthsPassedOrDaysOrHoursString}`;
  const isDesktopView = isDesktop();
  return isDesktopView ? (
    <ListingCardHeaderDesktop
      parsedHeading={parsedHeading}
      subheading={subheading}
      parsedlistedOn={parsedlistedOn}
      shouldShowEditListingOption={shouldShowEditListingOption}
    />
  ) : (
    <ListingCardHeaderMobile
      parsedHeading={parsedHeading}
      subheading={subheading}
      parsedlistedOn={parsedlistedOn}
    />
  );
};

export default ListingCardHeader;
