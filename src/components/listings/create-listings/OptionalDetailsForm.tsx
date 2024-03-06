import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Grid } from "@mui/material";
import ImagePicker from "./ImagePicker.component";

export default function OptionalDetailsForm() {
  return (
    <>
      {/* Image Picker Box */}
      <Box
        sx={{
          pt: 5,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add description and image to stand out
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <ImagePicker />
          </Grid>
          <Grid item xs={6}>
            <ImagePicker />
          </Grid>
        </Grid>
      </Box>
      {/* Description TextBox */}
      <Box
        sx={{
          pt: 2.5,
        }}
      >
        <TextField
          variant="outlined"
          required
          id="description"
          name="description"
          label="Describe your space"
          fullWidth
          multiline
          rows={5}
        />
      </Box>
    </>
  );
}
