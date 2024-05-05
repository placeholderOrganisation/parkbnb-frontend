import { useState } from "react";

import { Box } from "@mui/material";
import CitySearch from "./city-search.component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/global-store";
import { Listing } from "../../types/global.types";
import CitySearchSuggestionList from "./city-search-suggestions.component";
import { setSearchQuery, filterSearchResults } from "../../redux/search-slice";
import { callAnalytics } from "../../utils/amplitude-utils";

interface SearchContainerProps {
  handleEndAdornmentClick: () => void;
}

const SearchContainer = (props: SearchContainerProps) => {
  const { handleEndAdornmentClick } = props;
  const dispatch = useDispatch();
  const {
    searchResults,
    filters: { searchQuery },
  } = useSelector((state: RootState) => state.search);

  const [value, setValue] = useState(searchQuery || "");
  const [isSuggestionListOpen, setIsSuggestionListOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Listing[]>([]);

  const handleSearchQueryChange = (value: string) => {
    if (value && value.length > 0) {
      let suggestion: Listing[] = searchResults.filter((listing) =>
        listing.address.city.toLowerCase().startsWith(value.toLowerCase())
      );

      callAnalytics("search query changed", {
        query: value,
        suggestionsLength: suggestion.length,
      });

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
      // if search query is set in redux reset it
      if (searchQuery) {
        dispatch(setSearchQuery(""));
        dispatch(filterSearchResults());
      }
    }
    setValue(value);
  };

  const handleSuggestionClick = (cityName: string, index: number) => {
    callAnalytics("search suggestion clicked", { cityName, index });
    setValue(cityName);
    setIsSuggestionListOpen(false);
    dispatch(setSearchQuery(cityName));
    dispatch(filterSearchResults());
  };

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
      <CitySearch
        value={value}
        handleEndAdornmentClick={handleEndAdornmentClick}
        handleSearchQueryChange={handleSearchQueryChange}
      />
      {isSuggestionListOpen && (
        <CitySearchSuggestionList
          suggestions={suggestions}
          handleSuggestionClick={(cityName, index) => {
            handleSuggestionClick(cityName, index);
          }}
        />
      )}
    </Box>
  );
};

export default SearchContainer;
