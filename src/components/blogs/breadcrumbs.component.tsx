import { useNavigate } from "react-router-dom";
import { Breadcrumbs, Button, Typography } from "@mui/material";
import { Home as HomeIcon, Article as ArticleIcon } from "@mui/icons-material";

interface BlogBreadcrumbsProps {
  pageName?: string;
}

const BlogBreadcrumbs = (props: BlogBreadcrumbsProps) => {
  const { pageName = null } = props;
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      <Button
        variant="text"
        sx={{
          display: "flex",
          alignItems: "center",
          p: 0,
          textTransform: "none",
        }}
        onClick={() => {
          navigateTo("/");
        }}
      >
        <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
        Home
      </Button>
      <Button
        variant="text"
        sx={{
          display: "flex",
          alignItems: "center",
          p: 0,
          textTransform: "none",
        }}
        onClick={() => {
          navigateTo("/blogs");
        }}
      >
        <ArticleIcon fontSize="small" sx={{ mr: 0.5 }} />
        Blogs
      </Button>
      {pageName && <Typography color="text.primary">{pageName}</Typography>}
    </Breadcrumbs>
  );
};

export default BlogBreadcrumbs;
