import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { callAnalytics } from "../../utils/amplitude-utils";
import { useNavigate } from "react-router-dom";
import GradientText from "../custom-mui/graident-text.component";
import ParkingCardList from "./parking-card.list";
import { isDesktop } from "../../utils/display-utils";

const aboutUsCards = [
  {
    title: "Powerful Search",
    description:
      "Our easy search tool lets you filter by location, price, and lease to quickly find the ideal parking spot.",
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

const Landing = () => {
  const navigate = useNavigate();
  const isDesktopView = isDesktop();

  const handleFindParkingAction = () => {
    callAnalytics("find_parking_click");
    navigate("/listings");
  };

  const handleListParkingAction = () => {
    callAnalytics("list_parking_click");
    navigate("/create-listing");
  };

  const cards = [
    {
      title: "Are you looking for a parking space to rent?",
      description:
        "We help renters find parking near their postal code that they can afford.",
      action: "Find a parking",
      actionHandler: handleFindParkingAction,
      buttonVariant: "contained",
    },
    {
      title: "Are you looking to rent your parking space?",
      description:
        "We help hosts safely rent out extra parking to like-minded people.",
      action: "List your parking",
      actionHandler: handleListParkingAction,
      buttonVariant: "outlined",
    },
  ];

  return (
    <Container maxWidth="md">
      <Stack>
        <GradientText typographyVariant="h3">Rent A Parking</GradientText>
        <Typography variant="body1">The Parking Rental Website</Typography>
      </Stack>
      <Grid container spacing={2} sx={{ py: 4 }}>
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
                <Button
                  // @ts-ignore - buttonVariant is not a valid prop for Button
                  variant={card.buttonVariant}
                  color="primary"
                  fullWidth
                  onClick={card.actionHandler}
                  sx={{
                    borderRadius: 5
                  }}
                >
                  {card.action}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2}>
        <Divider />
        <Stack spacing={1}>
          <Typography variant="h5">Hot parkings in Brampton</Typography>
          <ParkingCardList city="Brampton" />
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h5">Hot parkings in Toronto</Typography>
          <ParkingCardList city="Toronto" />
        </Stack>
        <Stack spacing={1}>
          <Divider />
          <Typography variant="h4">About Us</Typography>
          <Stack
            direction={isDesktopView ? "row" : "column"}
            spacing={2}
            sx={{ pb: 4 }}
          >
            {aboutUsCards.map((card) => (
              <Box key={card.title}>
                <Card
                  sx={{
                    borderRadius: 4,
                  }}
                >
                  <CardContent>
                    <GradientText typographyVariant="h5">
                      {card.title}
                    </GradientText>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Landing;
