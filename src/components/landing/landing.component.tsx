import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { callAnalytics } from "../../utils/amplitude-utils";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

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
    },
    {
      title: "Are you looking to rent your parking space?",
      description:
        "We help hosts safely rent out extra parking to like-minded people.",
      action: "List your parking",
      actionHandler: handleListParkingAction,
    },
  ];

  return (
    <Container maxWidth="md">
      <Stack spacing={1}>
        <Typography variant="h3">The Parking Rental Website</Typography>
        <Typography variant="body1">
          Free site for posting ads for car, pickup truck, RV, boat and
          commercial truck trailer parking rentals.
        </Typography>
      </Stack>
      <Grid container spacing={2} sx={{ py: 4 }}>
        {cards.map((card) => (
          <Grid item xs={12} md={6}>
            <Card>
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
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={card.actionHandler}
                >
                  {card.action}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Divider />
          <Typography variant="h4">Rent A Parking</Typography>
          <Typography variant="body1">
            Welcome to Rent a Parking, your source for easy and affordable
            parking. Whether you're a homeowner wanting to make money from your
            driveway or garage, or a driver looking for a dependable parking
            spot to rent, Rent a Parking is here for you.
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Divider />
          <Typography variant="h4">Why Choose Us</Typography>
          <List sx={{ py: 0 }}>
            <ListItem sx={{ px: 0 }}>
              <ListItemText primary="Easy Search and Booking: Our easy search tool lets you filter by location, price, and lease to quickly find the ideal parking spot. It's very straightforward!" />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemText primary="Free to use: Rent a Parking is completely free. Whether you're looking for a parking spot or want to rent one out, there are no fees" />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemText primary="Parking Spot Owners: If you own a parking spot and want to monetize it, Rent a Parking makes it easy to do so." />
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Landing;
