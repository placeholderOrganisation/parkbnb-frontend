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
  fromParkingCardContainer?: boolean;
}

export interface ParkingCardLayoutProps {
  parking: Listing;
  showIcon: boolean;
  icon: JSX.Element | null;
  handleIconClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    listingId?: string
  ) => void;
  fromParkingCardContainer: boolean;
}

const ParkingCard = (props: ParkingCardProps) => {
  const { parking, showIcon, icon = null, handleIconClick = () => {}, fromParkingCardContainer = false } = props;

  return (
    <Box
      sx={{
        cursor: "pointer",
      }}
    >
      <ParkingCardMobile
        parking={parking}
        showIcon={showIcon}
        icon={icon}
        handleIconClick={handleIconClick}
        fromParkingCardContainer={fromParkingCardContainer}
      />
    </Box>
  );
};

export default ParkingCard;
