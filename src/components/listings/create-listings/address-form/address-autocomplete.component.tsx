import { MouseEvent, useEffect, useState } from "react";

import { Box } from "@mui/material";
import { AutocompleteResponse } from "../../../../types/global.types";
import { callAnalytics } from "../../../../utils/amplitude-utils";
import { fetchSearchSuggestionsV2 } from "../../../../utils/search-utils";
import CitySearch from "../../../search_v2/city-search-v2.component";
import CitySearchSuggestionList from "../../../search_v2/city-search-suggestions-v2.component";
import { extractAddressFromPlaceName } from "../../../../utils/geo-coding.utils";

interface AddressAutocomplete {
  handleEndAdornmentClick: () => void;
  onSuggestionsClick: (suggestion: AutocompleteResponse) => void;
  showFilters?: boolean;
  showNearMe?: boolean;
}

const AddressAutocomplete = (props: AddressAutocomplete) => {
  const {
    handleEndAdornmentClick,
    showFilters = true,
    showNearMe = true,
    onSuggestionsClick = () => {},
  } = props;

  const [value, setValue] = useState("");
  const [isSuggestionListOpen, setIsSuggestionListOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<AutocompleteResponse[]>([]);

  const handleSearchQueryChange = (value: string) => {
    setValue(value);
  };

  const handleSuggestionClick = (suggestion: AutocompleteResponse) => {
    callAnalytics("address_autocomplete_suggestion_clicked", { suggestion });
    const address = extractAddressFromPlaceName(suggestion.place_name);
    const formattedAddress = address
      ? `${address.street}, ${address.city}`
      : suggestion.text;
    onSuggestionsClick(suggestion);
    handleSearchQueryChange(formattedAddress);
    setIsSuggestionListOpen(false);
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
    const getSuggestions = async (value: string) => {
      let suggestion = await fetchSearchSuggestionsV2(value);
      if (!suggestion || !suggestion.results) {
        return;
      }
      setSuggestions(suggestion.results);
    };
    if (isSuggestionListOpen && value.length > 0) {
      getSuggestions(value);
    }
  }, [value]);

  return (
    <Box onClick={onCitySearchFocus}>
      <CitySearch
        value={value}
        shouldShowClearIcon={isSuggestionListOpen && value.length > 0}
        handleEndAdornmentClick={handleEndAdornmentClick}
        handleSearchQueryChange={handleSearchQueryChange}
        showFilters={showFilters}
        label="Enter your address"
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

export default AddressAutocomplete;
