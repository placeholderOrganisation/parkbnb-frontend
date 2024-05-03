import { Box } from "@mui/material";
import { isDesktop } from "../../utils/display-utils";
import ListingCardDesktopLayout from "./listing-card.desktop";
import ListingCardMobileLayout from "./listing-card.mobile";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { handleGetParking } from "../../utils/parking-utils";
import { Listing } from "../../types/global.types";
import Loading from "../../components/custom-mui/loading.component";
import { handleGetUserWithId } from "../../utils/user-utils";
import { ListingOwnerUserObject } from "../../types/user-types";

const ListingCard = () => {
  const isDesktopView = isDesktop();
  const Layout = isDesktopView
    ? ListingCardDesktopLayout
    : ListingCardMobileLayout;

  const { listingId } = useParams<{ listingId: string }>();
  const [fetchedListing, setFetchedListing] = useState<Listing | null>(null);
  const [owner, setOwner] = useState<ListingOwnerUserObject | null>(null);

  useEffect(() => {
    if (!listingId) {
      return;
    }
    handleGetParking(listingId)
      .then((response) => {
        const listing = response.data;
        const { owner_id } = listing;
        if (!owner_id) {
          setFetchedListing(listing);
        } else {
          handleGetUserWithId(owner_id)
            .then((response) => {
              const owner = response.user;
              setOwner(owner);
              setFetchedListing(listing);
            })
            .catch((error) => {
              console.error("Error fetching owner", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching parking", error);
      });
  }, [listingId]);

  if (!fetchedListing) {
    return (
      <Box sx={{ mt: 12 }}>
        <Loading height={100} width={100} />;
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: [0, 6],
        mb: { xs: 3, md: 6 },
      }}
    >
      <Layout listing={fetchedListing} listingOwner={owner} />
    </Box>
  );
};

export default ListingCard;
