import { Box } from "@mui/material";
import CreateListingForm from "../../components/listings/create-listings/CreateListingForm.component";

const NewListingForm = () => {
  return (
    <Box
      sx={{
        my: { xs: 3, md: 6 },
        mx: { xs: 2, md: 6 },
      }}
    >
      <CreateListingForm />
    </Box>
  );
};

export default NewListingForm;
