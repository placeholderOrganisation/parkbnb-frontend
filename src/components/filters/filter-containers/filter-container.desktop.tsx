import { Box, Stack, Typography } from "@mui/material";
import Filters from "../filter.component";
import ApplyResetFilterButtons from "./apply-reset-button.component";
import { FiltersContainerProps } from "../../../types/global.types";
import CloseIcon from "@mui/icons-material/Close";

const DesktopFiltersContainer = (props: FiltersContainerProps) => {
  const {
    isFilterSectionOpen,
    handleApplyFilters,
    handleResetFilters,
    handleClosingFilterSection,
  } = props;
  return (
    <Box display={isFilterSectionOpen ? "block" : "none"}>
      <Box
        sx={{
          bgcolor: "grey.100",
          overflow: "auto",
          mx: -2,
          mt: 2,
          p: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            my: 2,
          }}
        >
          <Typography variant="h4" component="div">
            Filters
          </Typography>
          <CloseIcon
            sx={{
              cursor: "pointer",
            }}
            onClick={handleClosingFilterSection}
          />
        </Stack>
        <Filters />
      </Box>
      <ApplyResetFilterButtons
        handleApplyFilters={handleApplyFilters}
        handleResetFilters={handleResetFilters}
      />
    </Box>
  );
};

export default DesktopFiltersContainer;
