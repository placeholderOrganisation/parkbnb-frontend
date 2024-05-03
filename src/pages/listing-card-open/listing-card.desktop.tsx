import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import ListingImageCarousel from "../../components/listing-card/listing-image-carousel.component";
import { Listing } from "../../types/global.types";
import { ListingOwnerUserObject } from "../../types/user-types";
import ListingCardHeader from "../../components/listing-card/listing-card-header.component";
import ListingDescription from "../../components/listing-card/listing-description.component";
import PricingBar from "../../components/listing-card/pricing-bar.component";
import UserInfo from "../../components/listing-card/user-info.component";
import ScrapedListingInfo from "../../components/listing-card/scraped-listing-info.component";
import ListingFilters from "../../components/listing-card/listing-filters.component";
import ListingCardChips from "../../components/listing-card/listing-card-chips.desktop";

interface ListingCardLayoutProps {
  listing: Listing;
  listingOwner: ListingOwnerUserObject | null;
  shouldShowEditListingOption: boolean;
}

const ListingCardDesktopLayout = (props: ListingCardLayoutProps) => {
  const { listing, listingOwner, shouldShowEditListingOption } = props;

  const { filters, address, price, listed_on, description, images } = listing;
  const { spaces, storage_type } = filters;

  return (
    <Container maxWidth="md">
      <Stack spacing={1}>
        <ListingCardHeader
          address={address}
          listed_on={listed_on}
          spaces={spaces}
          storage_type={storage_type}
          shouldShowEditListingOption={shouldShowEditListingOption}
        />
        <Box
          sx={{
            width: "100%",
            height: "300px",
          }}
        >
          <ListingImageCarousel images={images} />
        </Box>

        <Box
          sx={{
            py: 1,
          }}
        >
          <ListingCardChips listed_on={listed_on} />
        </Box>

        <Stack spacing={3} direction="row" justifyContent="space-between">
          <Stack
            spacing={1}
            sx={{
              width: "65%",
              border: "2px solid",
              borderColor: "grey.300",
              borderRadius: 2,
              p: 2,
            }}
          >
            <ListingFilters filters={filters} />
            <Stack spacing={1}>
              <Divider />
              <Typography variant="h5">Pricing</Typography>
              <PricingBar price={price} />
            </Stack>
            {/* Moved divider into ListingDescription since we conditionally render it */}
            <ListingDescription description={description} />
          </Stack>
          <Stack
            spacing={1}
            sx={{
              width: "45%",
              border: "2px solid",
              borderColor: "grey.300",
              borderRadius: 2,
              p: 2,
              height: "fit-content",
            }}
          >
            {listingOwner ? (
              <UserInfo user={listingOwner} />
            ) : (
              <ScrapedListingInfo listing={listing} />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default ListingCardDesktopLayout;
