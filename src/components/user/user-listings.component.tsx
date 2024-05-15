import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Listing } from "../../types/global.types";
import ParkingCard from "../parking-card/parking-card.component";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { isDesktop } from "../../utils/display-utils";
import { openInNewTab } from "../../utils/browser-utils";
import { useNavigate } from "react-router-dom";

interface UserListingsComponentProps {
  userListings: Listing[];
}

const UserListingsComponent = (props: UserListingsComponentProps) => {
  const { userListings } = props;

  const navigate = useNavigate();
  const isDesktopView = isDesktop();

  const handleListingCardOpen = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    listingId: string
  ) => {
    e.stopPropagation();
    if (isDesktopView) {
      openInNewTab(`/listing/${listingId}`);
      return;
    }
    navigate(`/listing/${listingId}`);
  };

  if (!userListings || userListings.length === 0) {
    return (
      <Container maxWidth="lg">
        <Stack spacing={1}>
          <Typography variant="h4" component="h1" gutterBottom>
            You have no listings
          </Typography>
          <Typography variant="body1" component="p">
            Get started by creating a listing.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/create-listing")}
            sx={{
              width: ["50%", "20%"],
            }}
          >
            Create Listing
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Your Listings
          </Typography>
        </Grid>
        {userListings.map((listing) => {
          return (
            <Grid
              item
              key={listing._id}
              xs={12}
              md={4}
              onClick={(e) => {
                handleListingCardOpen(e, listing._id);
              }}
            >
              <ParkingCard
                key={listing._id}
                parking={listing}
                showIcon
                icon={<OpenInNewIcon />}
                handleIconClick={(e) => {
                  handleListingCardOpen(e, listing._id);
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default UserListingsComponent;
