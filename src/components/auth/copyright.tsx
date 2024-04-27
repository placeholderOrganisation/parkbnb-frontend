import { Typography } from "@mui/material";
import { COMPANY_NAME } from "../../constants";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {`Copyright © ${COMPANY_NAME} `}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
