import { Box } from "@mui/material";
import CreateListingForm from "../../components/listings/create-listings/CreateListingForm.component";
import Footer from "../../components/footer/footer.component";

const NewListingForm = () => {
  return (
    <>
      <Box
        sx={{
          my: { xs: 3, md: 6 },
          mx: { xs: 2, md: 6 },
        }}
      >
        <CreateListingForm />
      </Box>
      <Box>
        <Footer />
      </Box>
    </>
  );
};

export default NewListingForm;
