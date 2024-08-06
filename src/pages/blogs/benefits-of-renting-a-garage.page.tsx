import { Box } from "@mui/material";
import Footer from "../../components/footer/footer.component";
import BenefitsOfRentingAGarage from "../../components/blogs/benefits-of-renting-a-garage.component";

const BenefitsOfRentingAGaragePage = () => {
  return (
    <>
      <Box
        sx={{
          mt: 6,
          mb: { xs: 3, md: 6 },
        }}
      >
        <BenefitsOfRentingAGarage />
      </Box>
      <Box>
        <Footer />
      </Box>
    </>
  );
};

export default BenefitsOfRentingAGaragePage;
