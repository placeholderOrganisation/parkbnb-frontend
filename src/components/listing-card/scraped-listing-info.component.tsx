import { Box, Stack, Typography } from "@mui/material";
import ShowContactInfoComponent from "./show-contact-info.component";
import { Listing } from "../../types/global.types";

interface ScrapedListingInfoProps {
  listing: Listing;
}

const ScrapedListingInfo = (props: ScrapedListingInfoProps) => {
  const { listing } = props;
  const { contact } = listing;

  // todo if user is null use contact number in parking
  if (!contact || contact === "null" || contact === "") {
    return null;
  }

  return (
    <>
      <Stack spacing={1}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1">Hosted by</Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              ml: 0.5,
            }}
          >
            Guest user
          </Typography>
        </Box>

        <ShowContactInfoComponent contactNumber={contact} />
      </Stack>
    </>
  );
};

export default ScrapedListingInfo;
