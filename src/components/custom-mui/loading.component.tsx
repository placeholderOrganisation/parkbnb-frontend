import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <CircularProgress
      color="primary"
      size="lg"
      sx={{
        width: "inherit",
        height: "inherit",
      }}
    />
  );
};

export default Loading;
