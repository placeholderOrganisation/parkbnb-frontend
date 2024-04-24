import { Box } from "@mui/material";
import { Listing } from "../../types/global.types";
import ParkingCardMobile from "./parking-card.mobile";

export interface ParkingCardProps {
  parking: Listing;
  showIcon: boolean;
  icon: JSX.Element | null;
  handleIconClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    listingId?: string
  ) => void;
}

export interface ParkingCardLayoutProps {
  parking: Listing;
  showIcon: boolean;
  icon: JSX.Element | null;
  handleIconClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    listingId?: string
  ) => void;
}

const ParkingCard = (props: ParkingCardProps) => {
  const { parking, showIcon, icon = null, handleIconClick = () => {} } = props;

  return (
    <Box>
      <ParkingCardMobile
        parking={parking}
        showIcon={showIcon}
        icon={icon}
        handleIconClick={handleIconClick}
      />
    </Box>
  );
};

export default ParkingCard;
