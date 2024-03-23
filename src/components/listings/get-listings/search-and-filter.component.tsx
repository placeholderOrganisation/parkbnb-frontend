import { useState } from "react";

import SearchContainer from "../../search/search.container";
import RightFullPageDrawer from "../../drawers/full-page-right-drawer.component";
import Filters from "../../filters/filter.component";

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
      >
        <Filters />
      </RightFullPageDrawer>
    </>
  );
};

export default SearchAndFilter;
