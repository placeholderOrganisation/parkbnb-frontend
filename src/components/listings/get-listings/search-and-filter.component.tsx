import { useState } from "react";

import SearchContainer from "../../search/search.container";
import RightFullPageDrawer from "../../drawers/full-page-right-drawer.component";
import Filters from "../../filters/filter.component";
import { Box, Button, Stack } from "@mui/material";

const SearchAndFilter = () => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  return (
    <>
      <SearchContainer
        handleEndAdornmentClick={() => setIsFilterDrawerOpen(true)}
      />
      <RightFullPageDrawer
        open={isFilterDrawerOpen}
        drawerClose={() => setIsFilterDrawerOpen(false)}
        drawerTitle={"Filters"}
        allowOverflow
        footer={
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{
              my: 3,
              mx: 2,
            }}
          >
            <Button variant="contained" color="primary" fullWidth>
              Apply
            </Button>
            <Button variant="outlined" color="primary" fullWidth>
              Reset
            </Button>
          </Stack>
        }
      >
        <Box
          sx={{
            bgcolor: "grey.100",
            overflow: "auto",
            m: -2,
            p: 2,
          }}
        >
          <Filters />
        </Box>
      </RightFullPageDrawer>
    </>
  );
};

export default SearchAndFilter;
