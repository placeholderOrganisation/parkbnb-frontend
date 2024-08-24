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
import { getImgForCity } from "../../utils/seo-utils";

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
