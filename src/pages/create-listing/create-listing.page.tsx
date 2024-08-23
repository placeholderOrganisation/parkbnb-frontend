import { Box } from "@mui/material";
import CreateListingForm from "../../components/listings/create-listings/CreateListingForm.component";
import Footer from "../../components/footer/footer.component";
import Head from "../../components/seo/head.component";
import { seoContent } from "../../constants";

const NewListingForm = () => {
  const { createListingPage } = seoContent;
  const {
    pageTitle,
    pageDescription,
    pageImage,
    pageCanonicalUrl,
    pageJsonLdData,
  } = createListingPage;
  return (
    <>
      <Head
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageImage={pageImage}
        pageCanonicalUrl={pageCanonicalUrl}
        pageJsonLdData={pageJsonLdData}
      />
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
