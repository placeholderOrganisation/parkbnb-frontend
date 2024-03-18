import { useState } from "react";

import SearchContainer from "../../search/search.container";
import RightFullPageDrawer from "../../drawers/full-page-right-drawer.component";

const SearchAndFilter = () => {

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  return (
    <>
      <SearchContainer handleEndAdornmentClick={() => setIsFilterDrawerOpen(true)} />
      <RightFullPageDrawer
        anchor="right"
        open={isFilterDrawerOpen}
        drawerClose={() => setIsFilterDrawerOpen(false)}
        drawerOpen={() => setIsFilterDrawerOpen(true)}
        drawerTitle={"Filters"}
      >
        <p>Filter content goes here</p>
      </RightFullPageDrawer>
    </>
  );
};

export default SearchAndFilter;
