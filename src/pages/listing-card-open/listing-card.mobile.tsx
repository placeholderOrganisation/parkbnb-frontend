import { Box, Stack } from "@mui/material";
import ListingCardHeader from "../../components/listing-card/listing-card-header.component";
import { Listing } from "../../types/global.types";
import ListingDescription from "../../components/listing-card/listing-description.component";
import UserInfo from "../../components/listing-card/user-info.component";
import ListingImageCarousel from "../../components/listing-card/listing-image-carousel.component";
import PricingBar from "../../components/listing-card/pricing-bar.component";
import { ListingOwnerUserObject } from "../../types/user-types";
import ScrapedListingInfo from "../../components/listing-card/scraped-listing-info.component";
import CardFooter from "../../components/listing-card/card-footer.container";
import ListingFilters from "../../components/listing-card/listing-filters.component";
import ShareIcon from "../../components/share-icon/share-icon-component";
import EditListing from "../../components/listing-card/edit-listing/edit-listing.component";
import NavigateBackToListingsPage from "../../components/listing-card/navigate-back-to-listing.component";

interface ListingCardLayoutProps {
  listing: Listing;
  listingOwner: ListingOwnerUserObject | null;
  shouldShowEditListingOption: boolean;
}

const ListingCardMobileLayout = (props: ListingCardLayoutProps) => {
  const { listing, listingOwner, shouldShowEditListingOption } = props;

  const { filters, address, price, listed_on, description, images } = listing;
  const { spaces, storage_type } = filters;

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 1,
          }}
        >
          <NavigateBackToListingsPage circularBorder />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 1,
          }}
        >
          <ShareIcon circularBorder />
        </Box>
        {shouldShowEditListingOption && (
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 80,
              zIndex: 1,
            }}
          >
            <EditListing circularBorder />
          </Box>
        )}
        <ListingImageCarousel images={images} />
      </Box>
      <Stack
        spacing={1}
        sx={{
          padding: 2,
        }}
      >
        <ListingCardHeader
          address={address}
          listed_on={listed_on}
          spaces={spaces}
          storage_type={storage_type}
        />
        <ListingFilters filters={filters} />
        {/* Moved divider into ListingDescription since we conditionally render it */}
        <ListingDescription description={description} />
        <Box sx={{ pb: 30 }} />
      </Stack>
      <CardFooter>
        <PricingBar price={price} />
        {listingOwner ? (
          <UserInfo user={listingOwner} />
        ) : (
          <ScrapedListingInfo listing={listing} />
        )}
      </CardFooter>
    </>
  );
};

export default ListingCardMobileLayout;
