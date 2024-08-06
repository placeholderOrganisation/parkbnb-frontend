import {
  Container,
  Typography,
  Box,
  Grid,
  Avatar,
  Divider,
  Stack,
} from "@mui/material";
import BlogBreadcrumbs from "./breadcrumbs.component";
import RoundedButton from "../custom-mui/rounded-button.component";
import { useNavigate } from "react-router-dom";
import { isDesktop, scrollToTop } from "../../utils/display-utils";

const BenefitsOfRentingAGarage = () => {
  const isDesktopView = isDesktop();
  const navigate = useNavigate();
  const navigateTo = (path: string) => {
    scrollToTop();
    navigate(path);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Breadcrumbs */}
      <BlogBreadcrumbs pageName="Benefits of Renting a Garage" />

      {/* Blog Header */}
      <Typography variant="h4" component="h1" gutterBottom>
        The Benefits of Renting a Garage: Security, Convenience, and Cost
      </Typography>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Avatar alt="Author" src="/static/images/avatar/2.jpg" />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" color="text.secondary">
            By Rent a Parking
          </Typography>
          <Typography variant="body2" color="text.secondary">
            July 15, 2024
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Blog Content */}
      <Box sx={{ my: 2 }}>
        <Typography variant="body1" paragraph>
          Renting a garage offers numerous benefits, making it an attractive
          option for those seeking secure and convenient parking solutions.
          Here’s why renting a garage can be advantageous:
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Security
        </Typography>
        <Typography variant="body1" paragraph>
          A garage provides enhanced protection for your vehicle and belongings,
          shielding them from theft and vandalism. It also offers a weatherproof
          environment, protecting your car from harsh weather conditions and
          reducing wear and tear.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Convenience
        </Typography>
        <Typography variant="body1" paragraph>
          Renting a garage can provide convenient access to your vehicle,
          especially in urban areas with limited parking. It offers flexibility
          in rental terms and can also serve as additional storage space for
          personal items, freeing up space in your home.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Cost-Effectiveness
        </Typography>
        <Typography variant="body1" paragraph>
          Compared to other parking options, renting a garage can be more
          cost-effective in the long run. It can help you save on insurance
          premiums, as vehicles parked in garages are often considered lower
          risk. Additionally, the protection from environmental elements can
          reduce maintenance costs.
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

export default BenefitsOfRentingAGarage;
