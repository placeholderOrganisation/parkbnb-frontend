import { Box, Stack, Typography } from "@mui/material";
import Loading from "../loading.component";

interface DoNotGoBackLoaderProps {
  label: string;
}

const DoNotGoBackLoader = (props: DoNotGoBackLoaderProps) => {
  const { label } = props;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Loading height={50} width={50} />
      <Stack
        sx={{
          width: ["unset", "100%"],
        }}
        spacing={1}
      >
        <Typography variant="h4">{label}</Typography>
        <Typography variant="caption">
          Please do not go back or refresh the page
        </Typography>
      </Stack>
    </Box>
  );
};

export default DoNotGoBackLoader;
