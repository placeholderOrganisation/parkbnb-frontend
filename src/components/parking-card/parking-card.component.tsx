import { Box } from "@mui/material";
import { isDesktop } from "../../utils/display-utils";
import ParkingCardDesktop from "./parking-card.desktop";
import ParkingCardMobile from "./parking-card.mobile";

const ParkingCard = () => {
  const isDesktopView = isDesktop();
  const Layout = isDesktopView ? ParkingCardDesktop : ParkingCardMobile;

  return (
    <Box>
      <Layout />
    </Box>
  );
};

export default ParkingCard;
