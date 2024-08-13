import { Box, Stack, Button } from "@mui/material";
import SearchComponent from "../search_v2/search-component";
import { useNavigate } from "react-router-dom";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const LandingSearch = () => {
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        py: 3,
      }}
      spacing={1}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            width: "90%",
          }}
        >
          <SearchComponent
            handleEndAdornmentClick={() => {}}
            showFilters={false}
            showNearMe={true}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "50%",
            minWidth: "auto",
            height: "50px",
            width: "50px",
            boxShadow: "none",
          }}
          onClick={() => {
            navigate("/listings");
          }}
        >
          <SearchOutlinedIcon />
        </Button>
      </Stack>
    </Stack>
  );
};

export default LandingSearch;
