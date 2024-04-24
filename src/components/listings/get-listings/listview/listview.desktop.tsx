import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ParkingCard from "../../../parking-card/parking-card.component";
import SortIcon from "@mui/icons-material/Sort";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ListviewPageLayoutProps, SortOption } from "./listview.component";

export default function ListviewDesktop(props: ListviewPageLayoutProps) {
  const {
    sortedListings,
    anchorEl,
    handleClick,
    handleClose,
    handleListingCardOpen,
  } = props;
  return (
    <>
      {/* Drawer header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgColor: "grey.100",
        }}
      >
        <Typography sx={{ p: 2, color: "text.secondary" }}>
          {`${sortedListings.length} results`}
        </Typography>

        {
          <Stack direction="row" sx={{ px: 2 }}>
            <IconButton
              id="sort-button"
              aria-controls="sort-menu"
              aria-haspopup="true"
              aria-expanded={!anchorEl ? "true" : undefined}
              onClick={handleClick}
              aria-label="sort"
              sx={{
                p: 0,
              }}
            >
              <SortIcon />
            </IconButton>
          </Stack>
        }
      </Box>

      {/* Drawer content */}
      <Box
        sx={{
          px: 2,
          pb: 2,
          height: "100%",
          overflow: "auto",
          bgcolor: "grey.100",
        }}
      >
        <Stack spacing={2} sx={{ my: 2 }}>
          {sortedListings.length === 0 ? (
            <Skeleton variant="rectangular" height="100%" />
          ) : (
            sortedListings.map((listing) => (
              <ParkingCard
                key={listing._id}
                parking={listing}
                showIcon
                icon={<OpenInNewIcon />}
                handleIconClick={(e) => {
                  handleListingCardOpen(e, listing._id);
                }}
              />
            ))
          )}
        </Stack>
      </Box>

      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => {
          handleClose();
        }}
        MenuListProps={{
          "aria-labelledby": "sort-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose(SortOption.Date);
          }}
        >
          Date
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose(SortOption.PriceHighToLow);
          }}
        >
          Price (high to low)
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose(SortOption.PriceLowToHigh);
          }}
        >
          Price (low to high)
        </MenuItem>
      </Menu>
    </>
  );
}
