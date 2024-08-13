import {
  Box,
  // Card,
  // CardActions,
  // CardContent,
  Container,
  // Grid,
  Stack,
  Typography,
} from "@mui/material";
// import { callAnalytics } from "../../utils/amplitude-utils";
// import { useNavigate } from "react-router-dom";
import GradientText from "../custom-mui/gradient-text.component";
import { isDesktop } from "../../utils/display-utils";
import AboutUsCard from "./about-us.card";
import CitySearchCard from "./city-search.card";
import ParkingCardList from "./parking-card.list";
// import RoundedButton from "../custom-mui/rounded-button.component";
import LandingSearch from "./landing-search.container";

const aboutUsCards = [
  {
    title: "Powerful Search",
    description:
      "Our map lets you filter by location, amenities and price to quickly find the ideal parking spot.",
  },
  {
    title: "Trusted by Many",
    description:
      "We have helped thousands of renters find parking near their postal code that they can afford.",
  },
  {
    title: "Free to Use",
    description:
      "Whether you're looking for a parking spot or want to rent one out, there are no fees.",
  },
];

const cities = ["Toronto", "Brampton", "Mississauga", "Vaughan"];

const Landing = () => {
  // const navigate = useNavigate();
  const isDesktopView = isDesktop();

  // const handleFindParkingAction = () => {
  //   callAnalytics("find_parking_click");
  //   navigate("/listings");
  // };

  // const handleListParkingAction = () => {
  //   callAnalytics("list_parking_click");
  //   navigate("/create-listing");
  // };

  // const cards = [
  //   {
  //     title: "Browse available parkings",
  //     description:
  //       "We help renters find parking near their postal code that they can afford.",
  //     action: "Find a parking",
  //     actionHandler: handleFindParkingAction,
  //     buttonVariant: "contained",
  //   },
  //   {
  //     title: "Rent your parking",
  //     description:
  //       "We help hosts safely rent out extra parking to like-minded people.",
  //     action: "List your parking",
  //     actionHandler: handleListParkingAction,
  //     buttonVariant: "outlined",
  //   },
  // ];

  return (
    <Container maxWidth="md">
      <Stack>
        <GradientText typographyVariant="h3">Rent A Parking</GradientText>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
          }}
        >
          <Typography variant="body1">Search</Typography>
          <GradientText typographyVariant="body1" otherSx={{ mx: 0.5 }}>
            100+
          </GradientText>
          <Typography variant="body1">active parking spots</Typography>
        </Stack>
      </Stack>
      <LandingSearch />
      {/* <Grid container spacing={2} sx={{ py: 4 }}>
        {cards.map((card) => (
          <Grid item xs={12} md={6} key={card.title}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions>
                <RoundedButton
                  otherProps={{
                    variant: card.buttonVariant,
                    color: "primary",
                    fullWidth: true,
                    onClick: card.actionHandler,
                  }}
                >
                  {card.action}
                </RoundedButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid> */}
      <Stack spacing={2}>
        <Typography variant="h4">Popular Cities</Typography>
        <Stack direction={isDesktopView ? "row" : "column"} spacing={2}>
          {cities.map((city) => (
            <CitySearchCard key={city} city={city} />
          ))}
        </Stack>
        {cities.map((city) => (
          <>
            <Typography variant="h5">Popular listings in {city}</Typography>
            <Stack direction={isDesktopView ? "row" : "column"} spacing={2}>
              <ParkingCardList city={city} />
            </Stack>
          </>
        ))}
        <Stack spacing={1}>
          <Typography variant="h4">About Us</Typography>
          <Stack
            direction={isDesktopView ? "row" : "column"}
            spacing={2}
            sx={{ pb: 4 }}
          >
            {aboutUsCards.map((card, index) => (
              <Box key={card.title}>
                <AboutUsCard
                  title={card.title}
                  description={card.description}
                  variant={index > 0 ? "light" : "dark"}
                />
              </Box>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Landing;
