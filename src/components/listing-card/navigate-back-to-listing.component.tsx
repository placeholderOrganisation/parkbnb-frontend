import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { callAnalytics } from "../../utils/amplitude-utils";

interface NavigateBackToListingsPageIconProps {
  circularBorder?: boolean;
}

const NavigateBackToListingsPage = (props: NavigateBackToListingsPageIconProps) => {
  const { circularBorder } = props;
  const navigate = useNavigate();
  const navigateBackToListingsPage = () => {
    callAnalytics("navigate_back_to_listings_page");
    navigate("/listings");
  };

  return (
    <>
      <Box
        sx={
          circularBorder
            ? {
                bgcolor: "common.white",
                width: 50,
                height: 50,
                borderRadius: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }
            : {}
        }
        onClick={navigateBackToListingsPage}
      >
        <ArrowBackOutlinedIcon
          sx={{ color: "primary.main", cursor: "pointer" }}
        />
      </Box>
    </>
  );
};

export default NavigateBackToListingsPage;
