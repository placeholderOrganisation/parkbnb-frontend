import { Box } from "@mui/material";
import { ReactNode } from "react";

interface CardFooterProps {
  children: ReactNode;
}

const CardFooter = (props: CardFooterProps) => {
  const { children } = props;
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 2,
        bgcolor: "background.paper",
        borderTop: "1px solid lightgray",
      }}
    >
      {children}
    </Box>
  );
};

export default CardFooter;
