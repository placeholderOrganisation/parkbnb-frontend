import { Box, CircularProgress, Container } from "@mui/material";

interface LoadingProps {
  height: number;
  width: number;
}

const Loading = (props: LoadingProps) => {
  const { height, width } = props;
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height,
          width,
        }}
      >
        <CircularProgress
          color="primary"
          size="lg"
          sx={{
            width: "inherit",
            height: "inherit",
          }}
        />
      </Box>
    </Container>
  );
};

export default Loading;
