import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

interface StyledListProps {
  list: { label: string; link: string }[];
}

const StyledList = (props: StyledListProps) => {
  const { list } = props;
  return list ? (
    <List>
      {list.map((listItem) => {
        return (
          <Link
            key={listItem.label}
            to={listItem.link}
            style={{
              textDecoration: "none",
              cursor: "pointer",
              color: "inherit",
              display: "block",
              width: "max-content",
            }}
          >
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  pl: 0,
                }}
              >
                <ListItemText primary={listItem.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        );
      })}
    </List>
  ) : null;
};

export default StyledList;
