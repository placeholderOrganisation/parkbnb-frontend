import RightFullPageDrawer from "../../drawers/full-page-right-drawer.component";
import ApplyResetFilterButtons from "./apply-reset-button.component";
import { Box } from "@mui/material";
import Filters from "../filter.component";
import { FiltersContainerProps } from "../../../types/global.types";

const MobileFiltersContainer = (props: FiltersContainerProps) => {
  const {
    isFilterSectionOpen,
    handleClosingFilterSection = () => {},
    handleApplyFilters,
    handleResetFilters,
  } = props;
  return (
    <RightFullPageDrawer
      open={isFilterSectionOpen}
      drawerClose={() => handleClosingFilterSection()}
      drawerTitle={"Filters"}
      // allowOverflow
      footer={
        <ApplyResetFilterButtons
          handleApplyFilters={handleApplyFilters}
          handleResetFilters={handleResetFilters}
        />
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
        <Box sx={{ pb: 10 }} />
      </Box>
    </RightFullPageDrawer>
  );
};

export default MobileFiltersContainer;
