import { Box, Grid, Typography } from "@mui/material";
import Copyright from "../auth/copyright";
import { COMPANY_NAME, footerLists } from "../../constants";
import StyledList from "./styled-list.component";

const organizationList = footerLists.filter(
  (listObject) => listObject.list === "organization"
)[0];

const parkingList = footerLists.filter(
  (listObject) => listObject.list === "parking"
)[0];

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "primary.light",
        py: 4,
      }}
    >
      <Box
        sx={{
          p: 2,
        }}
      >
        <Grid container>
          <Grid item xs={12} md={3}>
            <Typography variant="h3">{COMPANY_NAME}</Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                display: "flex",
                justifyContent: ["space-between", "space-around"],
                mt: [4, 0],
              }}
            >
              <Box sx={{ width: "130px" }}>
                <Typography variant="h5">Orgainzation</Typography>
                <StyledList list={organizationList.rows} />
              </Box>

              <Box sx={{ width: ["unset", "130px"] }}>
                <Typography variant="h5">Parkings</Typography>
                <StyledList list={parkingList.rows} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Copyright />
    </Box>
  );
};

export default Footer;
