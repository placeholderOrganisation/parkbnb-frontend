import {
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { AutocompleteResponse } from "../../types/global.types";
import NearMeSuggestion from "./near-me-suggestions-v2.component";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { MouseEvent } from "react";
import NoSearchResultSuggestion from "./no-result-suggestions-v2.component";

interface CitySearchSuggestionsProps {
  searchQuery: string;
  showNearMe?: boolean;
  suggestions: AutocompleteResponse[];
  handleSuggestionClick: (suggestion: AutocompleteResponse) => void;
  handleCloseSuggestionList: (
    e?: MouseEvent<Element | MouseEvent> | undefined
  ) => void;
}

const CitySearchSuggestionList = (props: CitySearchSuggestionsProps) => {
  const {
    searchQuery,
    showNearMe = true,
    suggestions = [],
    handleSuggestionClick,
    handleCloseSuggestionList,
  } = props;

  const SuggestionsComponent =
    suggestions && suggestions.length > 0 ? (
      <>
        {suggestions.map((suggestion, index) => {
          return (
            <ListItem
              key={index}
              onClick={(e) => {
                handleCloseSuggestionList(e);
                handleSuggestionClick(suggestion);
              }}
              sx={{
                px: [2, 0],
                cursor: "pointer",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 32,
                }}
              >
                <PlaceOutlinedIcon
                  sx={{
                    color: "primary.main",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                sx={{
                  textTransform: "capitalize",
                }}
                primary={suggestion.text}
                secondary={suggestion.place_name}
              />
            </ListItem>
          );
        })}
      </>
    ) : (
      <NoSearchResultSuggestion searchQuery={searchQuery} />
    );

  return (
    <>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          px: [2, 0],
          py: 4,
          pb: 2,
        }}
      >
        <Typography variant="h6">Search results</Typography>
        <InputAdornment
          position="end"
          sx={{
            cursor: "pointer",
          }}
          onClick={(e) => {
            // @ts-ignore
            handleCloseSuggestionList(e);
          }}
        >
          <CloseIcon />
        </InputAdornment>
      </Stack>
      <List>
        {showNearMe && (
          <NearMeSuggestion
            handleCloseSuggestionList={handleCloseSuggestionList}
            handleSuggestionClick={handleSuggestionClick}
          />
        )}
        {SuggestionsComponent}
      </List>
    </>
  );
};

export default CitySearchSuggestionList;
