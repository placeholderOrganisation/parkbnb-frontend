import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Listing } from "../../types/global.types";

interface CitySearchSuggestionsProps {
  suggestions: Listing[];
  handleSuggestionClick: (cityName: string, index: number) => void;
}

const CitySearchSuggestionList = (props: CitySearchSuggestionsProps) => {
  const { suggestions = [], handleSuggestionClick } = props;

  return suggestions && suggestions.length > 0 ? (
    <List>
      {suggestions.map((suggestion, index) => {
        return (
          <ListItem
            key={index}
            onClick={() =>
              handleSuggestionClick(suggestion.address.city, index)
            }
          >
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
    </List>
  ) : (
    <List>
      <ListItem key="no_suggestions">
        <ListItemText primary="No listings found in this city" />
      </ListItem>
    </List>
  );
};

export default CitySearchSuggestionList;
