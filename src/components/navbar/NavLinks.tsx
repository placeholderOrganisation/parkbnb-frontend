import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { NavbarLink } from "../../types/global.types";
import { useNavigate } from "react-router-dom";

interface NavLinkProps {
  linksToRender: NavbarLink[];
  handleNavLinkClick: () => void;
}

const NavLinks = (props: NavLinkProps) => {
  const { linksToRender, handleNavLinkClick } = props;
  const navigate = useNavigate();

  const onLinkClick = (path: string) => {
    handleNavLinkClick();
    navigate(path);
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <nav aria-label="secondary mailbox folders">
        <List>
          {linksToRender.map((navbarLink, index) => {
            return (
              <Box key={index}>
                <ListItem
                  disablePadding
                  onClick={() => {
                    onLinkClick(navbarLink.path);
                  }}
                >
                  <ListItemButton
                    sx={{
                      px: 0,
                    }}
                  >
                    <ListItemText primary={navbarLink.name} />
                    <ListItemIcon
                      sx={{
                        minWidth: "unset",
                      }}
                    >
                      <ChevronRightIcon />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <Divider />
              </Box>
            );
          })}
        </List>
      </nav>
    </Box>
  );
};

export default NavLinks;
