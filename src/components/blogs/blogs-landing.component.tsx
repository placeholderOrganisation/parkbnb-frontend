import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import RoundedButton from "../custom-mui/rounded-button.component";
import BlogBreadcrumbs from "./breadcrumbs.component";

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "How to Rent Out Your Driveway for Extra Income",
    excerpt:
      "Learn how to turn your unused driveway into a steady stream of extra income with this comprehensive guide.",
    author: "Rent a Parking",
    date: "July 10, 2024",
    link: "/blogs/how-to-rent-your-space",
  },
  {
    id: 2,
    title: "The Benefits of Renting a Garage: Security, Convenience, and Cost",
    excerpt:
      "Discover the many advantages of renting a garage for your vehicle and belongings, from enhanced security to cost savings.",
    author: "Rent a Parking",
    date: "July 15, 2024",
    link: "/blogs/benefits-of-renting-a-garage",
  },
];

const BlogsLanding = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <BlogBreadcrumbs />
      <Typography variant="h3" component="h1" gutterBottom>
        Read Our Blogs
      </Typography>
      <Grid container spacing={4}>
        {blogPosts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {post.excerpt}
                </Typography>
                <Grid container alignItems="center">
                  <Grid item>
                    <Avatar
                      alt={post.author}
                      src={`/static/images/avatar/${post.id}.jpg`}
                    />
                  </Grid>
                  <Grid item sx={{ ml: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {post.author}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {post.date}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <RoundedButton
                otherProps={{
                  variant: "contained",
                  color: "primary",
                  onClick: () => {
                    navigateTo(`${post.link}`);
                  },
                }}
                otherSx={{
                  m: 2,
                }}
              >
                Read More
              </RoundedButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogsLanding;
