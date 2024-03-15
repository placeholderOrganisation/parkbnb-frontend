import { Box } from "@mui/material";
import { isDesktop } from "../../utils/display-utils";
import ParkingCardDesktop from "./parking-card.desktop";
import ParkingCardMobile from "./parking-card.mobile";
import { Listing } from "../../types/global.types";

export interface ParkingCardProps {
  parking: Listing;
}

const ParkingCard = (props: ParkingCardProps) => {
  const { parking } = props;
  const isDesktopView = isDesktop();
  const Layout = isDesktopView ? ParkingCardDesktop : ParkingCardMobile;

  return (
    <Box>
      <Layout parking={parking} />
    </Box>
  );
};

export default ParkingCard;
