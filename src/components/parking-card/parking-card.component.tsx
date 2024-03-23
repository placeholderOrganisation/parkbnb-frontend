import { Box } from "@mui/material";
import { isDesktop } from "../../utils/display-utils";
import ParkingCardDesktop from "./parking-card.desktop";
import ParkingCardMobile from "./parking-card.mobile";
import { Listing } from "../../types/global.types";

export interface ParkingCardProps {
  parking: Listing;
  showIcon: boolean;
}

export interface ParkingCardLayoutProps {
  parking: Listing;
  showIcon: boolean;
}

const ParkingCard = (props: ParkingCardProps) => {
  const { parking, showIcon } = props;

  const isDesktopView = isDesktop();
  const Layout = isDesktopView ? ParkingCardDesktop : ParkingCardMobile;

  return (
    <Box>
      <Layout parking={parking} showIcon={showIcon} />
    </Box>
  );
};

export default ParkingCard;
