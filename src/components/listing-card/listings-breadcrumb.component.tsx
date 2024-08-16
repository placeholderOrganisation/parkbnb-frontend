import { useNavigate } from "react-router-dom";
import { Breadcrumbs, Button, Typography } from "@mui/material";
import { Home as HomeIcon, FormatListBulleted } from "@mui/icons-material";
import { callAnalytics } from "../../utils/amplitude-utils";

interface ListingBreadCrumbsProps {
  pageName?: string;
}

const ListingBreadCrumbs = (props: ListingBreadCrumbsProps) => {
  const { pageName = null } = props;
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      <Button
        variant="text"
        sx={{
          display: "flex",
          alignItems: "center",
          p: 0,
          textTransform: "none",
        }}
        onClick={() => {
          navigateTo("/");
        }}
      >
        <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
        Home
      </Button>
      <Button
        variant="text"
        sx={{
          display: "flex",
          alignItems: "center",
          p: 0,
          textTransform: "none",
        }}
        onClick={() => {
          callAnalytics("navigate_back_to_listings_page");
          navigateTo("/listings");
        }}
      >
        <FormatListBulleted fontSize="small" sx={{ mr: 0.5 }} />
        Listings
      </Button>
      {pageName && <Typography color="text.primary">{pageName}</Typography>}
    </Breadcrumbs>
  );
};

export default ListingBreadCrumbs;
