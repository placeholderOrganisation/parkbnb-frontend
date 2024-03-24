import { Box } from "@mui/material";

interface PinProps {
  label: string;
}

function Pin(props: PinProps) {
  const { label } = props;
  return (
    <Box
      sx={{
        borderRadius: "25%",
        backgroundColor: "primary.main",
        border: "2px solid white",
        cursor: "pointer",
        px: 1,
        py: 0.5,
        color: "white",
      }}
    >
      {label}
    </Box>
  );
}

export default Pin;
