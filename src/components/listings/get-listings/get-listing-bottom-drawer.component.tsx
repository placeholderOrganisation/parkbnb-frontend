import { useState } from "react";
import {
  CssBaseline,
  Skeleton,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { Global } from "@emotion/react";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { RootState } from "../../../redux/global-store";
import { useSelector } from "react-redux";
import ParkingCard from "../../parking-card/parking-card.component";

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
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            {`${listingsRenderedInMap.length} results`}
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          {listingsRenderedInMap.length === 0 ? (
            <Skeleton variant="rectangular" height="100%" />
          ) : (
            listingsRenderedInMap.map((listing) => (
              <ParkingCard key={listing.id} />
            ))
          )}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
