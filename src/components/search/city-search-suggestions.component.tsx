import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Listing } from "../../types/global.types";
import NearMeSuggestion from "./near-me-suggestions.component";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CloseIcon from "@mui/icons-material/Close";

interface CitySearchSuggestionsProps {
  suggestions: Listing[];
  handleSuggestionClick: (cityName: string, index: number) => void;
  handleCloseSuggestionList: () => void;
}

const CitySearchSuggestionList = (props: CitySearchSuggestionsProps) => {
  const {
    suggestions = [],
    handleSuggestionClick,
    handleCloseSuggestionList,
  } = props;

  const SuggestionsComponent = suggestions && suggestions.length > 0 && (
    <>
      {suggestions.map((suggestion, index) => {
        return (
          <ListItem
            key={index}
            onClick={() =>
              handleSuggestionClick(suggestion.address.city, index)
            }
            sx={{
              pl: [2, 0],
              cursor: "pointer",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 32,
              }}
            >
              <PlaceOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={suggestion.address.city} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="click me"
                onClick={() =>
                  handleSuggestionClick(suggestion.address.city, index)
                }
              >
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </>
  );

  return (
    <>
      <Stack
        direction="row"
        sx={{
          justifyContent: "end",
          pr: 2,
          py: 4,
          pb: 2,
        }}
      >
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
