import { Stack, Typography } from "@mui/material";
import { ListingCardHeaderLayoutProps } from "../listing-card-header.component";

const ListingCardHeaderDesktop = (props: ListingCardHeaderLayoutProps) => {
  const { parsedHeading, subheading } = props;
  return (
    <Stack spacing={0.5}>
      <Typography variant="h2">{parsedHeading}</Typography>

      <Typography
        variant="h5"
        sx={{
          color: "text.secondary",
          textTransform: "capitalize",
        }}
      >
        {subheading}
      </Typography>
    </Stack>
  );
};

export default ListingCardHeaderDesktop;
