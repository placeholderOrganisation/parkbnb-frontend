import { Box } from "@mui/material";
import Footer from "../../components/footer/footer.component";
import BlogsLanding from "../../components/blogs/blogs-landing.component";

const BlogsLandingPage = () => {
  return (
    <>
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
