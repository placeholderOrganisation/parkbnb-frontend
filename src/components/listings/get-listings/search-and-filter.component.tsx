import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isDesktop } from "../../../utils/display-utils";
import SearchContainer from "../../search_v2/search-v2.container";
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
import { callAnalytics } from "../../../utils/amplitude-utils";
import { RootState } from "../../../redux/global-store";

const SearchAndFilter = () => {
  const [isFilterSectionOpen, setIsFilterSectionOpen] = useState(false);
  const dispatch = useDispatch();
  const isDesktopView = isDesktop();

  const { filters } = useSelector((state: RootState) => state.search);

  const handleResetFilters = () => {
    callAnalytics("filters_reset");
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
    callAnalytics("filters_applied", {
      filters,
    });
    dispatch(filterSearchResults());
    handleClosingFilterSection();
  };

  const handleOpeningFilterSection = () => {
    callAnalytics("filter_section_opened");
    setIsFilterSectionOpen(true);
  };

  const handleClosingFilterSection = () => {
    callAnalytics("filter_section_closed");
    setIsFilterSectionOpen(false);
  };

  return (
    <>
      <SearchContainer
        handleEndAdornmentClick={() => handleOpeningFilterSection()}
      />
      {isDesktopView ? (
        <DesktopFiltersContainer
          isFilterSectionOpen={isFilterSectionOpen}
          handleApplyFilters={handleApplyFilters}
          handleResetFilters={handleResetFilters}
          handleClosingFilterSection={handleClosingFilterSection}
        />
      ) : (
        <MobileFiltersContainer
          isFilterSectionOpen={isFilterSectionOpen}
          handleApplyFilters={handleApplyFilters}
          handleResetFilters={handleResetFilters}
          handleClosingFilterSection={handleClosingFilterSection}
        />
      )}
    </>
  );
};

export default SearchAndFilter;
