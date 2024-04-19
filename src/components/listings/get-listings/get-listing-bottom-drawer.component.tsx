import { useEffect, useState } from "react";
import {
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { Global } from "@emotion/react";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { RootState } from "../../../redux/global-store";
import { useSelector } from "react-redux";
import ParkingCard from "../../parking-card/parking-card.component";
import SortIcon from "@mui/icons-material/Sort";
import dayjs from "dayjs";
import { Listing } from "../../../types/global.types";

const drawerBleeding = 56;

enum SortOption {
  Date,
  PriceHighToLow,
  PriceLowToHigh,
}

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function GetListingBottomDrawer(props: Props) {
  const { window } = props;
  const [open, setOpen] = useState(false);
  const listingsRenderedInMap = useSelector(
    (state: RootState) => state.search.listingsRenderedInMap
  );

  const [sortOption, setSortOption] = useState(SortOption.Date);
  const [sortedListings, setSortedListings] = useState<Listing[]>(
    listingsRenderedInMap
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option?: number) => {
    if (option !== undefined) {
      setSortOption(option);
    }
    setAnchorEl(null);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    // Sort the listings based on the selected option
    let tmpSortedListings = listingsRenderedInMap;
    switch (sortOption) {
      case SortOption.Date:
        tmpSortedListings = [...listingsRenderedInMap].sort((a, b) => {
          const listedOnListingA = dayjs(a.listed_on);
          const listedOnListingB = dayjs(b.listed_on);
          return listedOnListingB.diff(listedOnListingA);
        });
        break;
      case SortOption.PriceHighToLow:
        tmpSortedListings = [...listingsRenderedInMap].sort(
          (a, b) => b.price.monthly - a.price.monthly
        );
        break;
      case SortOption.PriceLowToHigh:
        tmpSortedListings = [...listingsRenderedInMap].sort(
          (a, b) => a.price.monthly - b.price.monthly
        );
        break;
      default:
        break;
    }
    setSortedListings(tmpSortedListings);
  }, [sortOption]);

  useEffect(() => {
    setSortedListings(listingsRenderedInMap);
  }, [listingsRenderedInMap]);

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(90% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {/* Drawer header */}
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            {`${sortedListings.length} results`}
          </Typography>

          {open && (
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
          )}
        </StyledBox>

        {/* Drawer content */}
        <StyledBox
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
                  showIcon={false}
                />
              ))
            )}
          </Stack>
        </StyledBox>
      </SwipeableDrawer>
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
    </Root>
  );
}
