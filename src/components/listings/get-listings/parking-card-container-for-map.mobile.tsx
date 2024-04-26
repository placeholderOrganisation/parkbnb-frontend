import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/global-store";
import ParkingCard from "../../parking-card/parking-card.component";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { setUserSelectedListing } from "../../../redux/search-slice";
import { useNavigate } from "react-router-dom";
import { isDesktop } from "../../../utils/display-utils";
import { openInNewTab } from "../../../utils/browser-utils";

const ParkingCardContainerForMap = () => {
  const userSelectedListing = useSelector(
    (state: RootState) => state.search.userSelectedListing
  );

  const isDesktopView = isDesktop();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!userSelectedListing) {
    return null;
  }

  const handleListingCardOpen = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    listingId: string
  ) => {
    e.stopPropagation();
    if (isDesktopView) {
      openInNewTab(`/listing/${listingId}`);
      return;
    }
    navigate(`/listing/${listingId}`);
  };

  const closeParkingCard = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch(setUserSelectedListing(null));
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: [90, 50],
        mx: 2,
        zIndex: 100,
        width: ["calc(100% - 32px)", "max-content"],
        bgcolor: "white",
        borderRadius: 4,
      }}
      onClick={(e) => {
        handleListingCardOpen(e, userSelectedListing._id);
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
