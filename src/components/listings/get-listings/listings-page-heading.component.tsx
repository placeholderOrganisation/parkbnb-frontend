import { Box, Typography } from "@mui/material";
import { getURIParams } from "../../../utils/browser-utils";
import { capitalizedString } from "../../../utils/seo-utils";

const PageHeading = () => {
  const uriParams = getURIParams();
  const { city, postalCode, address } = uriParams;

  let heading = null;
  if (city) {
    const capitalizedCity = capitalizedString(city);
    heading = `Monthly parkings in ${capitalizedCity}, Canada`;
  } else if (postalCode) {
    heading = `Monthly parkings near ${postalCode}`;
  } else if (address) {
    heading = `Monthly parkings near ${address}`;
  }

  if (!heading) return null;

  return (
    <Box>
      <Typography variant="h5" component="h1">
        {heading}
      </Typography>
    </Box>
  );
};

export default PageHeading;
