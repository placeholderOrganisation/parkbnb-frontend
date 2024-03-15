import { useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { Divider, InputAdornment, TextField } from "@mui/material";
import RightFullPageDrawer from "../../drawers/full-page-right-drawer.component";

const SearchAndFilter = () => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Search for a city"
        variant="outlined"
        sx={{
          position: "absolute",
          top: 16,
          left: 0,
          mx: 2,
          zIndex: 100,
          width: "calc(100% - 32px)",
          bgcolor: "white",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Divider
                orientation="vertical"
                // flexItem
                sx={{
                  height: 40,
                  mx: 1,
                }}
              />
              <TuneIcon
                onClick={() => {
                  setIsFilterDrawerOpen(true);
                }}
              />
            </InputAdornment>
          ),
        }}
      />
      <RightFullPageDrawer
        anchor="right"
        open={isFilterDrawerOpen}
        drawerClose={() => setIsFilterDrawerOpen(false)}
        drawerOpen={() => setIsFilterDrawerOpen(true)}
      >
        filters
      </RightFullPageDrawer>
    </>
  );
};

export default SearchAndFilter;
