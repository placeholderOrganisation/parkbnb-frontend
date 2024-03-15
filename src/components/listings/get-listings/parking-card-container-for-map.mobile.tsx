import { useSelector } from "react-redux";
import { RootState } from "../../../redux/global-store";
import ParkingCard from "../../parking-card/parking-card.component";
import { Box } from "@mui/material";
import { Listing } from "../../../types/global.types";

const ParkingCardContainerForMap = () => {
  const searchState = useSelector((state: RootState) => state.search);
  const userSelectedListing: Listing | null = searchState.userSelectedListing;

  if (!userSelectedListing) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 100,
        mx: 2,
        zIndex: 100,
        width: "calc(100% - 32px)",
        bgcolor: "white",
      }}
    >
      <ParkingCard parking={userSelectedListing} />
    </Box>
  );
};

export default ParkingCardContainerForMap;
