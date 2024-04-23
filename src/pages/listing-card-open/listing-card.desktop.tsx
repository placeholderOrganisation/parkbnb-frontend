import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/global-store";
import { Listing } from "../../types/global.types";
import { ListingOwnerUserObject } from "../../types/user-types";

interface ListingCardLayoutProps {
  listing: Listing;
  listingOwner: ListingOwnerUserObject | null;
}

const ListingCardDesktopLayout = (props: ListingCardLayoutProps) => {
  const { listingId } = useParams<{ listingId: string }>();

  const userSelectedListing = useSelector(
    (state: RootState) => state.search.userSelectedListing
  );

  console.log("userSelectedListing", listingId, userSelectedListing, props);

  return <div>ListingCardMobile</div>;
};

export default ListingCardDesktopLayout;
