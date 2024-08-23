import { Box } from "@mui/material";
import Footer from "../../components/footer/footer.component";
import Landing from "../../components/landing/landing.component";
import Head from "../../components/seo/head.component";
import { seoContent } from "../../utils/seo-utils";


const LandingPage = () => {
  const { landingPage } = seoContent;
  const { pageTitle, pageDescription, pageImage, pageCanonicalUrl, pageJsonLdData } = landingPage;
  
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
