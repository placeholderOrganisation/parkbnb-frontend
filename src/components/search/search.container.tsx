import { useState } from "react";

import { Box } from "@mui/material";
import CitySearch from "./city-search.component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/global-store";
import { Listing } from "../../types/global.types";
import CitySearchSuggestionList from "./city-search-suggestions.component";
import { setSearchQuery } from "../../redux/search-slice";

interface SearchContainerProps {
  handleEndAdornmentClick: () => void;
}

const SearchContainer = (props: SearchContainerProps) => {
  const { handleEndAdornmentClick } = props;
  const dispatch = useDispatch();
  const searchState = useSelector((state: RootState) => state.search);

  const [value, setValue] = useState("");
  const [isSuggestionListOpen, setIsSuggestionListOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Listing[]>([]); // Specify the type as an array of Listing objects

  const handleSearchQueryChange = (value: string) => {
    if (value && value.length > 0) {
      let suggestion: Listing[] = searchState.listingsRenderedInMap.filter(
        (listing) =>
          listing.address.city.toLowerCase().startsWith(value.toLowerCase())
      );

      // Remove duplicates
      suggestion = suggestion.reduce((unique: Listing[], item: Listing) => {
        return unique.findIndex(
          (uItem) => uItem.address.city === item.address.city
        ) >= 0
          ? unique
          : [...unique, item];
      }, []);

      setSuggestions(suggestion.slice(0, 5));
      if (value.length > 2 || suggestion.length > 0) {
        setIsSuggestionListOpen(true);
      }
    } else {
      setSuggestions([]);
      setIsSuggestionListOpen(false);
    }
    setValue(value);
  };

  const handleSuggestionClick = (cityName: string) => {
    setValue(cityName);
    setIsSuggestionListOpen(false);
    dispatch(setSearchQuery(cityName));
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 16,
        left: 0,
        mx: 2,
        zIndex: 100,
        width: "calc(100% - 32px)",
        bgcolor: "white",
      }}
    >
      <CitySearch
        value={value}
        handleEndAdornmentClick={handleEndAdornmentClick}
        handleSearchQueryChange={handleSearchQueryChange}
      />
      {isSuggestionListOpen && (
        <CitySearchSuggestionList
          suggestions={suggestions}
          handleSuggestionClick={(cityName) => {
            handleSuggestionClick(cityName);
          }}
        />
      )}
    </Box>
  );
};

export default SearchContainer;
