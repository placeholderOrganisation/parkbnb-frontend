import { Box } from "@mui/material";
import Footer from "../../components/footer/footer.component";
import Landing from "../../components/landing/landing.component";

const LandingPage = () => {
  return (
    <>
      <Box
        sx={{
          mt: 5,
          mb: { xs: 3, md: 6 },
        }}
      >
        <Landing />
      </Box>
      <Box>
        <Footer />
      </Box>
    </>
  );
};

export default LandingPage;
