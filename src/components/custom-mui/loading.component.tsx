import { CircularProgress, Container } from "@mui/material";

const Loading = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        marginTop: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress
        color="primary"
        size="lg"
        sx={{
          height: "100px",
          width: "100px",
        }}
      />
    </Container>
  );
};

export default Loading;
