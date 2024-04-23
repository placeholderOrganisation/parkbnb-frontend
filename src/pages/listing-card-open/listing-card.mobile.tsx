import { Box, Stack } from "@mui/material";
import ListingCardHeader from "../../components/listing-card/listing-card-header.component";
import { Listing } from "../../types/global.types";
import ListingAmenities from "../../components/listing-card/listing-filters.component";
import ListingDescription from "../../components/listing-card/listing-description.component";
import UserInfo from "../../components/listing-card/user-info.component";
import ListingImageCarousel from "../../components/listing-card/listing-image-carousel.component";
import PricingBar from "../../components/listing-card/pricing-bar.component";
import { ListingOwnerUserObject } from "../../types/user-types";
import ScrapedListingInfo from "../../components/listing-card/scraped-listing-info.component";
import CardFooter from "../../components/listing-card/card-footer.container";

interface ListingCardLayoutProps {
  listing: Listing;
  listingOwner: ListingOwnerUserObject | null;
}

const ListingCardMobileLayout = (props: ListingCardLayoutProps) => {
  const { listing, listingOwner } = props;

  const { filters, address, price, listed_on, description, images } = listing;
  const { spaces, storage_type } = filters;

  return (
    <>
      <ListingImageCarousel images={images} />
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
        <ListingAmenities filters={filters} />
        {/* Moved divider into ListingDescription since we conditionally render it */}
        <ListingDescription description={description} />
        <Box sx={{ pb: 15 }} />
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
