import { useSelector } from "react-redux";
import { Listing } from "../../../types/global.types";
import { RootState } from "../../../redux/global-store";
import ParkingCard from "../../parking-card/parking-card.component";
import { Box } from "@mui/material";

export interface ListingPopupProps {
  parking: Listing;
}

const ListingPopup = () => {
  const state = useSelector((state: RootState) => state);
  const userSelectedListing = state.search.userSelectedListing;

  console.log("userSelectedListing inside parking-card", userSelectedListing);

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

export default ListingPopup;
