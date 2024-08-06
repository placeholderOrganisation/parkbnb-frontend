import {
  Container,
  Typography,
  Box,
  Grid,
  Avatar,
  Divider,
  Stack,
} from "@mui/material";

import { COMPANY_NAME } from "../../constants";
import { useNavigate } from "react-router-dom";
import RoundedButton from "../../components/custom-mui/rounded-button.component";
import { isDesktop, scrollToTop } from "../../utils/display-utils";
import BlogBreadcrumbs from "./breadcrumbs.component";

const HowToRentYourSpace = () => {
  const navigate = useNavigate();
  const isDesktopView = isDesktop();

  const navigateTo = (path: string) => {
    scrollToTop();
    navigate(path);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Breadcrumbs */}
      <BlogBreadcrumbs pageName="How to Rent Out Your Driveway" />

      {/* Blog Header */}
      <Typography variant="h4" component="h1" gutterBottom>
        How to Rent Out Your Driveway for Extra Income
      </Typography>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Avatar alt="Author" src="/static/images/avatar/1.jpg" />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" color="text.secondary">
            By {COMPANY_NAME}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            July 10, 2024
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Blog Content */}
      <Box sx={{ my: 2 }}>
        <Typography variant="body1" paragraph>
          Renting out your driveway can be an excellent way to earn extra
          income, especially if you live in a city with limited parking options.
          Follow these steps to start monetizing your unused space:
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Assess the Space
        </Typography>
        <Typography variant="body1" paragraph>
          Evaluate the size, security, and accessibility of your driveway.
          Ensure it is clean and free from obstructions.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Research the Market
        </Typography>
        <Typography variant="body1" paragraph>
          Understand the demand and pricing in your area by looking at similar
          listings.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          List Your Space
        </Typography>
        <Typography variant="body1" paragraph>
          Create an attractive listing with clear descriptions and photos.
          Highlight the benefits of your location.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Set Terms and Conditions
        </Typography>
        <Typography variant="body1" paragraph>
          Outline rules and pricing for renters. Be clear about availability and
          any restrictions.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Promote Your Listing
        </Typography>
        <Typography variant="body1" paragraph>
          Use social media and community boards to reach potential renters.
          Consider offering introductory discounts.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Manage Bookings and Payments
        </Typography>
        <Typography variant="body1" paragraph>
          Utilize tools and platforms that streamline the booking and payment
          process to ensure smooth transactions.
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Call to Action */}
      <Stack
        spacing={2}
        direction={isDesktopView ? "row" : "column"}
        sx={{
          justifyContent: "center",
        }}
      >
        <RoundedButton
          otherProps={{
            variant: "contained",
            color: "primary",
            onClick: () => {
              navigateTo("/create-listing");
            },
          }}
        >
          Rent your parking
        </RoundedButton>
        <RoundedButton
          otherProps={{
            variant: "outlined",
            color: "primary",
            onClick: () => {
              navigateTo("/listings");
            },
          }}
        >
          Search Parkings
        </RoundedButton>
      </Stack>
    </Container>
  );
};

export default HowToRentYourSpace;
