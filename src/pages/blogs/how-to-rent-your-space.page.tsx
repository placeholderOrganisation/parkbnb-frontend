import { Box } from "@mui/material";
import Footer from "../../components/footer/footer.component";
import HowToRentYourSpace from "../../components/blogs/how-to-rent-your-space.component";

const HowToRentYourSpacePage = () => {
  return (
    <>
      <Box
        sx={{
          mt: 6,
          mb: { xs: 3, md: 6 },
        }}
      >
        <HowToRentYourSpace />
      </Box>
      <Box>
        <Footer />
      </Box>
    </>
  );
};

export default HowToRentYourSpacePage;
