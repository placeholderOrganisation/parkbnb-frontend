import { useSelector } from "react-redux";
import { RootState } from "../../../redux/global-store";
import ParkingCard from "../../parking-card/parking-card.component";
import { Box } from "@mui/material";

const ParkingCardContainerForMap = () => {
  const searchState = useSelector((state: RootState) => state.search);
  const userSelectedListing = searchState.userSelectedListing;

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
      <ParkingCard />
    </Box>
  );
};

export default ParkingCardContainerForMap;
