import { useNavigate } from "react-router-dom";
import { isDesktop } from "../../../../utils/display-utils";
import ListviewDesktop from "./listview.desktop";
import Listviewmobile from "./listview.mobile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/global-store";
import { useEffect, useState } from "react";
import { Listing } from "../../../../types/global.types";
import dayjs from "dayjs";
import { setUserSelectedListingUsingListingId } from "../../../../redux/search-slice";

export enum SortOption {
  Date,
  PriceHighToLow,
  PriceLowToHigh,
}

export interface ListviewPageLayoutProps {
  sortOption: SortOption;
  sortedListings: Listing[];
  anchorEl: null | HTMLElement;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: (option?: number) => void;
  handleListingCardOpen: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    listingId?: string
  ) => void;
}

const ListviewComponent = () => {
  const isDesktopView = isDesktop();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listingsRenderedInMap = useSelector(
    (state: RootState) => state.search.listingsRenderedInMap
  );
  const [sortOption, setSortOption] = useState(SortOption.Date);
  const [sortedListings, setSortedListings] = useState<Listing[]>(
    listingsRenderedInMap
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option?: number) => {
    if (option !== undefined) {
      setSortOption(option);
    }
    setAnchorEl(null);
  };

  const handleListingCardOpen = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    listingId?: string
  ) => {
    e.stopPropagation();
    dispatch(setUserSelectedListingUsingListingId(listingId));
    if (isDesktopView) {
      window.open(`/listing/${listingId}`, "_blank", "rel=noopener noreferrer");
      return;
    }
    navigate(`/listing/${listingId}`);
  };

  useEffect(() => {
    // Sort the listings based on the selected option
    let tmpSortedListings = listingsRenderedInMap;
    switch (sortOption) {
      case SortOption.Date:
        tmpSortedListings = [...listingsRenderedInMap].sort((a, b) => {
          const listedOnListingA = dayjs(a.listed_on);
          const listedOnListingB = dayjs(b.listed_on);
          return listedOnListingB.diff(listedOnListingA);
        });
        break;
      case SortOption.PriceHighToLow:
        tmpSortedListings = [...listingsRenderedInMap].sort(
          (a, b) => b.price.monthly - a.price.monthly
        );
        break;
      case SortOption.PriceLowToHigh:
        tmpSortedListings = [...listingsRenderedInMap].sort(
          (a, b) => a.price.monthly - b.price.monthly
        );
        break;
      default:
        break;
    }
    setSortedListings(tmpSortedListings);
  }, [sortOption]);

  useEffect(() => {
    setSortedListings(listingsRenderedInMap);
  }, [listingsRenderedInMap]);

  return isDesktopView ? (
    <ListviewDesktop
      sortOption={sortOption}
      sortedListings={sortedListings}
      anchorEl={anchorEl}
      handleClick={handleClick}
      handleClose={handleClose}
      handleListingCardOpen={handleListingCardOpen}
    />
  ) : (
    <Listviewmobile
      sortOption={sortOption}
      sortedListings={sortedListings}
      anchorEl={anchorEl}
      handleClick={handleClick}
      handleClose={handleClose}
      handleListingCardOpen={handleListingCardOpen}
    />
  );
};

export default ListviewComponent;
