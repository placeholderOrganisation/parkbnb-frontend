import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Listing } from "../../types/global.types";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NearMeSuggestion from "./near-me-suggestions.component";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { MouseEvent } from "react";
import NoSearchResultSuggestion from "./no-result-suggestions.component";

interface CitySearchSuggestionsProps {
  searchQuery: string;
  suggestions: Listing[];
  handleSuggestionClick: (cityName: string, index: number) => void;
  handleCloseSuggestionList: (
    e?: MouseEvent<Element | MouseEvent> | undefined
  ) => void;
}

const CitySearchSuggestionList = (props: CitySearchSuggestionsProps) => {
  const {
    searchQuery,
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
                handleSuggestionClick(suggestion.address.city, index);
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
                primary={suggestion.address.city}
              />
              <ListItemSecondaryAction
                sx={{
                  right: [16, 0],
                }}
              >
                <IconButton
                  edge="end"
                  aria-label="click me"
                  onClick={(e) => {
                    handleCloseSuggestionList(e);
                    handleSuggestionClick(suggestion.address.city, index);
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </ListItemSecondaryAction>
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
        <NearMeSuggestion
          handleCloseSuggestionList={handleCloseSuggestionList}
        />
        {SuggestionsComponent}
      </List>
    </>
  );
};

export default CitySearchSuggestionList;
