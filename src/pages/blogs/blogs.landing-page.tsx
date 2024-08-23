import { Box } from "@mui/material";
import Footer from "../../components/footer/footer.component";
import BlogsLanding from "../../components/blogs/blogs-landing.component";
import Head from "../../components/seo/head.component";
import { seoContent } from "../../utils/seo-utils";

const BlogsLandingPage = () => {
  const { blogsPage } = seoContent;
  const { pageTitle, pageDescription, pageImage, pageCanonicalUrl } = blogsPage;
  return (
    <>
      <Head
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageImage={pageImage}
        pageCanonicalUrl={pageCanonicalUrl}
      />
      <Box
        sx={{
          mt: 6,
          mb: { xs: 3, md: 6 },
        }}
      >
        <BlogsLanding />
      </Box>
      <Box>
        <Footer />
      </Box>
    </>
  );
};

export default BlogsLandingPage;
