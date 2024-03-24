import { useState } from "react";
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

const drawerBleeding = 56;

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const searchState = useSelector((state: RootState) => state.search);
  const listingsRenderedInMap = searchState.listingsRenderedInMap;

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
            {`${listingsRenderedInMap.length} results`}
          </Typography>

          {open && (
            <Stack direction="row" sx={{ px: 2 }}>
              <IconButton
                id="sort-button"
                aria-controls="sort-menu"
                aria-haspopup="true"
                aria-expanded={!!anchorEl ? "true" : undefined}
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
            {listingsRenderedInMap.length === 0 ? (
              <Skeleton variant="rectangular" height="100%" />
            ) : (
              listingsRenderedInMap.map((listing) => (
                <ParkingCard
                  key={listing.id}
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
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "sort-button",
        }}
      >
        <MenuItem onClick={handleClose}>Date</MenuItem>
        <MenuItem onClick={handleClose}>Price (high to low)</MenuItem>
        <MenuItem onClick={handleClose}>Price (low to high)</MenuItem>
      </Menu>
    </Root>
  );
}
