import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fab,
  Typography,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { openInNewTab } from "../../utils/browser-utils";
import { callAnalytics } from "../../utils/amplitude-utils";

const getImgForCity = (city: string) => {
  switch (city) {
    case "Brampton":
      return "https://www.teamarora.com/wp-content/uploads/2022/06/Brampton-downtown.jpg";
    case "Toronto":
      return "https://media.cntraveler.com/photos/5b2be6938b842c3b35c5d30c/16:9/w_1280,c_limit/Toronto_getty-Images_748610951.jpg";
    case "Mississauga":
      return "https://www.ontarioconstructionnews.com/wp-content/uploads/2023/11/mississauga.jpg";
    case "Vaughan":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Vaughan_Metropolitan_Centre_aerial_view_2022.jpg/800px-Vaughan_Metropolitan_Centre_aerial_view_2022.jpg";
    default:
      return "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg";
  }
};

interface CitySearchCardProps {
  city: string;
}

/**
 * This component redirects user to listings page and
 * with search query set as city name in the URIparams.
 * @returns
 */
const CitySearchCard = (props: CitySearchCardProps) => {
  const { city } = props;

  const openCityListingsPage = () => {
    callAnalytics("city_search_click", { city });
    openInNewTab(`/listings?city=${city}`);
  };

  const imgUrl = getImgForCity(city);

  return (
    <Card
      sx={{ position: "relative", width: "100%", height: 230, borderRadius: 4 }}
    >
      <CardActionArea
        sx={{ position: "relative", width: "100%", height: 230 }}
        onClick={openCityListingsPage}
      >
        <CardMedia
          component="div"
          sx={{
            height: "100%",
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <CardContent
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(255, 255, 255)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 16px",
            height: "30%",
          }}
        >
          <Typography variant="h5" component="h6">
            {city}
          </Typography>
          <Fab
            color="primary"
            aria-label="place"
            size="large"
            sx={{ position: "absolute", top: -28, right: 16 }}
            onClick={openCityListingsPage}
          >
            <PlaceIcon />
          </Fab>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CitySearchCard;
