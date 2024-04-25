import { Typography } from "@mui/material";
import { ListingCardHeaderLayoutProps } from "../listing-card-header.component";

const ListingCardHeaderMobile = (props: ListingCardHeaderLayoutProps) => {
  const { parsedHeading, subheading, parsedlistedOn } = props;
  return (
    <>
      <Typography variant="h4">{parsedHeading}</Typography>
      <Typography
        variant="h5"
        sx={{
          color: "text.secondary",
          textTransform: "capitalize",
        }}
      >
        {subheading}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {parsedlistedOn}
      </Typography>
    </>
  );
};

export default ListingCardHeaderMobile;
