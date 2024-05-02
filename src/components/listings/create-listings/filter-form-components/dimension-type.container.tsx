import { Box, Stack, Typography } from "@mui/material";
import MoreInfoDrawer from "../../../drawers/more-info.bottom-drawer";
import DimensionsFilter from "../../../filters/dimensions-filter.component";

interface DimensionTypeFilterContainerProps {
  dimensionsInRedux: {
    minLength: number;
    minWidth: number;
  };
  handleDimensionsFilterChange: (dimensions: {
    minLength: number;
    minWidth: number;
  }) => void;
}

const DimensionTypeFilterContainer = (
  props: DimensionTypeFilterContainerProps
) => {
  const { dimensionsInRedux, handleDimensionsFilterChange } = props;
  return (
    <Stack spacing={1}>
      <DimensionsFilter
        dimensionsInRedux={dimensionsInRedux}
        handleDimensionsFilterChange={handleDimensionsFilterChange}
      />
      <MoreInfoDrawer label="Learn more about setting dimensions">
        <Stack spacing={1}>
          <Box>
            <Typography variant="body1">
              Select the{" "}
              <Typography
                component="span"
                variant="body2"
                sx={{ fontWeight: "bold" }}
              >
                largest
              </Typography>{" "}
              dimensions for your space.
            </Typography>
          </Box>
          <Typography variant="body2">
            When users filter by a dimension we include listings with area
            greater than or equal to the dimensions set.
          </Typography>
          <Typography variant="body2">
            For example, if you set the dimensions to 20' x 20', your listing
            will be included in search results for users looking for spaces that
            have an area of atleast 40 sqft. In this case your lising will also be include in search results
            for 40' x 10' spaces.
          </Typography>
        </Stack>
      </MoreInfoDrawer>
    </Stack>
  );
};

export default DimensionTypeFilterContainer;
