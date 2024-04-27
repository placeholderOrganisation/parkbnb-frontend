import { Box, Stack, Typography } from "@mui/material";
import { ListingCardHeaderLayoutProps } from "../listing-card-header.component";
import ShareIcon from "../../share-icon/share-icon-component";

const ListingCardHeaderDesktop = (props: ListingCardHeaderLayoutProps) => {
  const { parsedHeading, subheading } = props;
  return (
    <Stack spacing={0.5}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography variant="h2">{parsedHeading}</Typography>
        <Box
          sx={{
            mt: 0.5,
            display: "flex",
            height: 24,
            width: 48,
            justifyContent: "center",
          }}
        >
          <ShareIcon />
        </Box>
      </Stack>

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
