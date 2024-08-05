import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/global-store";
import { Box, Skeleton, Stack } from "@mui/material";
import { setUserSelectedListingUsingListingId } from "../../redux/search-slice";
import { callAnalytics } from "../../utils/amplitude-utils";
import { openInNewTab } from "../../utils/browser-utils";
import { useNavigate } from "react-router-dom";
import { isDesktop } from "../../utils/display-utils";
import ParkingCard from "../parking-card/parking-card.component";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import dayjs from "dayjs";

interface ParkingCardListProps {
  city: string;
}

/**
 * This component is used on landing page to give user
 * a preview of parking cards to choose from.
 * @returns
 */
const ParkingCardList = (props: ParkingCardListProps) => {
  const { city } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isDesktopView = isDesktop();
  const numberOfResultsToShow = 5;

  const searchResults = useSelector(
    (state: RootState) => state.search.searchResults
  );

  const filteredSearchResultsBasedOnCity = searchResults?.filter(
    (result) => result.address.city.toLowerCase() === city.toLowerCase()
  );

  const sortedAndFilteredSearchResults = filteredSearchResultsBasedOnCity?.sort(
    (a, b) => {
      return dayjs(a.listed_on).isBefore(dayjs(b.listed_on)) ? 1 : -1;
    }
  );

  const handleListingCardOpen = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    listingId?: string
  ) => {
    e.stopPropagation();
    dispatch(setUserSelectedListingUsingListingId(listingId));
    callAnalytics("listing_card_clicked", {
      location: "landing",
    });
    if (isDesktopView) {
      openInNewTab(`/listing/${listingId}`);
      return;
    }
    navigate(`/listing/${listingId}`);
  };

  return (
    <Stack
      direction="row"
      sx={{
        overflow: "auto",
        msOverflowStyle: "none", // IE and Edge
        scrollbarWidth: "none", // Firefox
        "&::-webkit-scrollbar": {
          display: "none", // Chrome, Safari and Opera
        },
        width: "100%",
      }}
    >
      {!sortedAndFilteredSearchResults ||
      sortedAndFilteredSearchResults.length === 0 ? (
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "100px",
            borderRadius: 4,
            flexDirection: "column",
          }}
        />
      ) : (
        sortedAndFilteredSearchResults
          .slice(0, numberOfResultsToShow)
          .map((listing) => (
            <Box
              onClick={(e) => {
                handleListingCardOpen(e, listing._id);
              }}
              key={listing._id}
              sx={{
                mb: 2,
                mx: 1,
              }}
            >
              <ParkingCard
                parking={listing}
                showIcon
                icon={<OpenInNewIcon />}
                handleIconClick={(e) => {
                  handleListingCardOpen(e, listing._id);
                }}
              />
            </Box>
          ))
      )}
    </Stack>
  );
};

export default ParkingCardList;
