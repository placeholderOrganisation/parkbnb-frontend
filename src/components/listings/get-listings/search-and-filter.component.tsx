import { useState } from "react";
import { useDispatch } from "react-redux";
import { isDesktop } from "../../../utils/display-utils";
import SearchContainer from "../../search/search.container";
import DesktopFiltersContainer from "../../filters/filter-containers/filter-container.desktop";
import MobileFiltersContainer from "../../filters/filter-containers/filter-container.mobile";
import {
  filterSearchResults,
  setAmenitiesFilter,
  setDimesionsFilter,
  setMonthlyPriceFilter,
  setNumSpacesFilter,
  setStorageTypeFilter,
  setVehicleTypesFilter,
} from "../../../redux/search-slice";
import {
  amenitiesInitialState,
  dimensionsInitialState,
  monthlyPriceInitialState,
  numSpacesFilterInitialState,
  storageTypeInitialState,
  vehicleTypeInitialState,
} from "../../../redux/search-slice.util";


const SearchAndFilter = () => {
  const [isFilterDesktopSectionOpen, setIsFilterDesktopSectionOpen] = useState(
    false
  );
  const [isFilterMobileDrawerOpen, setIsFilterMobileDrawerOpen] = useState(
    false
  );
  const dispatch = useDispatch();
  const isDesktopView = isDesktop();

  const handleResetFilters = () => {
    // reset filters in redux to default
    dispatch(setAmenitiesFilter(amenitiesInitialState));
    dispatch(setMonthlyPriceFilter(monthlyPriceInitialState));
    dispatch(setStorageTypeFilter(storageTypeInitialState));
    dispatch(setVehicleTypesFilter(vehicleTypeInitialState));
    dispatch(setDimesionsFilter(dimensionsInitialState));
    dispatch(setNumSpacesFilter(numSpacesFilterInitialState));
    // filters are already set in redux to default
    dispatch(filterSearchResults());
    handleClosingFilterSection();
  };

  const handleApplyFilters = () => {
    // filters are already set in redux via individual filter components
    dispatch(filterSearchResults());
    handleClosingFilterSection();
  };

  const handleOpeningFilterSection = () => {
    if (isDesktopView) {
      setIsFilterDesktopSectionOpen(true);
      return;
    }
    setIsFilterMobileDrawerOpen(true);
  };

  const handleClosingFilterSection = () => {
    if (isDesktopView) {
      setIsFilterDesktopSectionOpen(false);
      return;
    }
    setIsFilterMobileDrawerOpen(false);
  };

  return (
    <>
      <SearchContainer
        handleEndAdornmentClick={() => handleOpeningFilterSection()}
      />
      <MobileFiltersContainer
        isFilterSectionOpen={isFilterMobileDrawerOpen}
        handleApplyFilters={handleApplyFilters}
        handleResetFilters={handleResetFilters}
        handleClosingFilterSection={handleClosingFilterSection}
      />
      <DesktopFiltersContainer
        isFilterSectionOpen={isFilterDesktopSectionOpen}
        handleApplyFilters={handleApplyFilters}
        handleResetFilters={handleResetFilters}
        handleClosingFilterSection={handleClosingFilterSection}
      />
    </>
  );
};

export default SearchAndFilter;
