import { Box } from "@mui/material";
import { isDesktop } from "../../utils/display-utils";
import ParkingCardDesktop from "./parking-card.desktop";
import ParkingCardMobile from "./parking-card.mobile";
import { Listing } from "../../types/global.types";

export interface ParkingCardProps {
  parking: Listing;
  showIcon: boolean;
  icon: JSX.Element | null;
  handleIconClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, listingId?: string) => void;
}

export interface ParkingCardLayoutProps {
  parking: Listing;
  showIcon: boolean;
  icon: JSX.Element | null;
  handleIconClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, listingId?: string) => void;
}

const ParkingCard = (props: ParkingCardProps) => {
  const { parking, showIcon, icon = null, handleIconClick = () => {} } = props;

  const isDesktopView = isDesktop();
  const Layout = isDesktopView ? ParkingCardDesktop : ParkingCardMobile;

  return (
    <Box>
      <Layout
        parking={parking}
        showIcon={showIcon}
        icon={icon}
        handleIconClick={handleIconClick}
      />
    </Box>
  );
};

export default ParkingCard;
