import { MouseEvent, useEffect, useState } from "react";

import { Box } from "@mui/material";
import CitySearch from "./city-search-v2.component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/global-store";
import { AutocompleteResponse } from "../../types/global.types";
import CitySearchSuggestionList from "./city-search-suggestions-v2.component";
import { setSearchQuery, filterSearchResults } from "../../redux/search-slice";
import { callAnalytics } from "../../utils/amplitude-utils";
import { fetchSearchSuggestionsV2 } from "../../utils/search-utils";
import { resetMapCoords, setMapCoords } from "../../redux/map-slice";

interface SearchComponent {
  handleEndAdornmentClick: () => void;
  showFilters?: boolean;
  showNearMe?: boolean;
}

const SearchComponent = (props: SearchComponent) => {
  const {
    handleEndAdornmentClick,
    showFilters = true,
    showNearMe = true,
  } = props;
  const dispatch = useDispatch();
  const {
    searchResults,
    filters: { searchQuery },
  } = useSelector((state: RootState) => state.search);

  const [value, setValue] = useState(searchQuery || "");
  const [isSuggestionListOpen, setIsSuggestionListOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<AutocompleteResponse[]>([]);

  const handleSearchQueryChange = (
    value: string,
    trackWithAmp: boolean = true
  ) => {
    setValue(value);
    if (trackWithAmp) {
      callAnalytics("search query submitted", {
        query: value,
      });
    }
  };

  const handleSuggestionClick = (suggestion: AutocompleteResponse) => {
    callAnalytics("search suggestion clicked", { suggestion });
    handleSearchQueryChange(suggestion.text);
    setIsSuggestionListOpen(false);
    console.log("suggestions", suggestion);
    dispatch(
      setMapCoords({
        lat: suggestion.center.lat,
        lng: suggestion.center.lng,
        zoom: 14,
      })
    );
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
      handleSearchQueryChange(searchQuery, false);
    }
  }, [searchQuery, searchResults]);

  useEffect(() => {
    const getSuggestions = async (value: string) => {
      let suggestion = await fetchSearchSuggestionsV2(value);
      if (!suggestion || !suggestion.results) {
        return;
      }
      setSuggestions(suggestion.results);
    };
    if (value) {
      getSuggestions(value);
    } else {
      dispatch(setSearchQuery(""));
      dispatch(filterSearchResults());
      dispatch(resetMapCoords());
    }
  }, [value]);

  return (
    <Box onClick={onCitySearchFocus}>
      <CitySearch
        value={value}
        handleEndAdornmentClick={handleEndAdornmentClick}
        handleSearchQueryChange={handleSearchQueryChange}
        showFilters={showFilters}
      />
      {isSuggestionListOpen && (
        <CitySearchSuggestionList
          searchQuery={value}
          showNearMe={showNearMe}
          suggestions={suggestions}
          handleSuggestionClick={(suggestion) => {
            handleSuggestionClick(suggestion);
          }}
          handleCloseSuggestionList={handleCloseSuggestionList}
        />
      )}
    </Box>
  );
};

export default SearchComponent;
