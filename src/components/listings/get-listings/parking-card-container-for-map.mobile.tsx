import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/global-store";
import ParkingCard from "../../parking-card/parking-card.component";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { setUserSelectedListing } from "../../../redux/search-slice";

const ParkingCardContainerForMap = () => {
  const userSelectedListing = useSelector(
    (state: RootState) => state.search.userSelectedListing
  );

  const dispatch = useDispatch();

  if (!userSelectedListing) {
    return null;
  }

  const closeParkingCard = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(setUserSelectedListing(null));
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 90,
        mx: 2,
        zIndex: 100,
        width: "calc(100% - 32px)",
        bgcolor: "white",
        borderRadius: 4,
      }}
    >
      <ParkingCard
        parking={userSelectedListing}
        showIcon
        icon={<CloseIcon />}
        handleIconClick={closeParkingCard}
      />
    </Box>
  );
};

export default ParkingCardContainerForMap;
