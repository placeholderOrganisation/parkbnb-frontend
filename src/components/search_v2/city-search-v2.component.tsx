import { Divider, InputAdornment, TextField } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";

interface CitySearchProps {
  handleEndAdornmentClick: (value: boolean) => void;
  value: string;
  handleSearchQueryChange: (value: string) => void;
  showFilters?: boolean;
}

const CitySearch = (props: CitySearchProps) => {
  const {
    handleEndAdornmentClick,
    value,
    handleSearchQueryChange,
    showFilters = true,
  } = props;
  return (
    <TextField
      value={value}
      onChange={(e) => handleSearchQueryChange(e.target.value)}
      id="city-search"
      variant="outlined"
      label="Search by address"
      sx={{
        width: "100%",
      }}
      InputProps={{
        endAdornment: (
          <>
            {/* X icon */}
            {value && (
              <InputAdornment
                position="end"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSearchQueryChange("");
                }}
                sx={{
                  cursor: "pointer",
                }}
              >
                <CloseIcon />
              </InputAdornment>
            )}
            {/* open filter drawer with divider icon */}
            {showFilters && (
              <InputAdornment
                position="end"
                sx={{
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEndAdornmentClick(true);
                }}
              >
                <Divider
                  orientation="vertical"
                  // flexItem
                  sx={{
                    height: 40,
                    mx: 1,
                  }}
                />
                <TuneIcon />
              </InputAdornment>
            )}
          </>
        ),
      }}
      inputProps={{
        autoComplete: "off",
      }}
    />
  );
};

export default CitySearch;
