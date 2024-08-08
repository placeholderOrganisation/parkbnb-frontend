import { Box } from "@mui/material";
import SearchComponent from "./search-component";

interface SearchContainerProps {
  handleEndAdornmentClick: () => void;
  showFilters?: boolean;
  showNearMe?: boolean;
}

const SearchContainer = (props: SearchContainerProps) => {
  const {
    handleEndAdornmentClick,
    showFilters = true,
    showNearMe = true,
  } = props;
  return (
    <Box
      sx={{
        position: ["absolute", "inherit"],
        top: 16,
        left: 0,
        mx: [2, "auto"],
        zIndex: 100,
        width: ["calc(100% - 32px)", "100%"],
        bgcolor: "white",
      }}
    >
      <SearchComponent
        handleEndAdornmentClick={handleEndAdornmentClick}
        showFilters={showFilters}
        showNearMe={showNearMe}
      />
    </Box>
  );
};

export default SearchContainer;
