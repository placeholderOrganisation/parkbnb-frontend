import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import Copyright from "../auth/copyright";
import { COMPANY_NAME, footerLists } from "../../constants";
import StyledList from "./styled-list.component";
import logo from "/rentaparking.png";

const topCitiesList = footerLists.filter(
  (listObject) => listObject.list === "topCities"
)[0];

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
            <Stack
              direction="row"
              sx={{
                pl: [1, 5],
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{
                  p: 0,
                  "& img": {
                    filter: "invert(1)", // This will invert the colors making white turn black
                    height: "40px",
                  },
                }}
              >
                <img style={{ height: "40px" }} src={logo} alt="" />
              </IconButton>
              <Typography variant="h4">{COMPANY_NAME}</Typography>
            </Stack>
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
                <Typography variant="h5">Top Cities</Typography>
                <Stack direction="row" spacing={5}>
                  <StyledList list={topCitiesList.rows.slice(0, 2)} />
                  <StyledList list={topCitiesList.rows.slice(2)} />
                </Stack>
              </Box>

              <Box sx={{ width: ["unset", "130px"] }}></Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={3}></Grid>
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
