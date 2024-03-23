import { Divider, InputAdornment, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";

interface CitySearchProps {
  handleEndAdornmentClick: (value: boolean) => void;
  value: string;
  handleSearchQueryChange: (value: string) => void;
}

const CitySearch = (props: CitySearchProps) => {
  const { handleEndAdornmentClick, value, handleSearchQueryChange } = props;
  return (
    <TextField
      value={value}
      onChange={(e) => handleSearchQueryChange(e.target.value)}
      type="search"
      id="city-search"
      variant="outlined"
      label="Search for a city"
      sx={{
        width: "100%",
      }}
      InputProps={{
        endAdornment: (
          <>
            <InputAdornment position="end">
              <Divider
                orientation="vertical"
                // flexItem
                sx={{
                  height: 40,
                  mx: 1,
                }}
              />
              <TuneIcon
                onClick={() => {
                  handleEndAdornmentClick(true);
                }}
              />
            </InputAdornment>
          </>
        ),
      }}
    />
  );
};

export default CitySearch;
