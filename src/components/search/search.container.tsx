import { MouseEvent, useEffect, useState } from "react";

import { Box } from "@mui/material";
import CitySearch from "./city-search.component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/global-store";
import { Listing } from "../../types/global.types";
import CitySearchSuggestionList from "./city-search-suggestions.component";
import { setSearchQuery, filterSearchResults } from "../../redux/search-slice";
import { callAnalytics } from "../../utils/amplitude-utils";
import { deleteURIParam } from "../../utils/browser-utils";
import { fetchSearchSuggestions } from "../../utils/search-utils";

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
      let suggestion: Listing[] = fetchSearchSuggestions(value, searchResults);

      callAnalytics("search query changed", {
        query: value,
        suggestionsLength: suggestion.length,
      });
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
      deleteURIParam("city");
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

  const onCitySearchFocus = () => {
    setIsSuggestionListOpen(true);
  };

  const handleCloseSuggestionList = (
    e?: MouseEvent<Element | MouseEvent> | undefined
  ) => {
    if (e) {
      e.stopPropagation();
    }
    setIsSuggestionListOpen(false);
  };

  useEffect(() => {
    if (searchQuery !== value && searchResults.length > 0) {
      setValue(searchQuery);
      handleSearchQueryChange(searchQuery);
      setIsSuggestionListOpen(false);
    }
  }, [searchQuery, searchResults]);

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
      onClick={onCitySearchFocus}
    >
      <CitySearch
        value={value}
        handleEndAdornmentClick={handleEndAdornmentClick}
        handleSearchQueryChange={handleSearchQueryChange}
      />
      {isSuggestionListOpen && (
        <CitySearchSuggestionList
          searchQuery={value}
          suggestions={suggestions}
          handleSuggestionClick={(cityName, index) => {
            handleSuggestionClick(cityName, index);
          }}
          handleCloseSuggestionList={handleCloseSuggestionList}
        />
      )}
    </Box>
  );
};

export default SearchContainer;
