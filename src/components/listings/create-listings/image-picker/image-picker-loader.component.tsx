import { Box, Container } from "@mui/material";
import Loading from "../../../custom-mui/loading.component";

const ImageLoader = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        my: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "100px",
          width: "100px",
        }}
      >
        <Loading />
      </Box>
    </Container>
  );
};

export default ImageLoader;
