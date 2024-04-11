import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box, Grid } from "@mui/material";
import ImagePicker from "./ImagePicker.component";
import { useDispatch } from "react-redux";
import { setDescription } from "../../../redux/step-three-slice";

export default function OptionalDetailsForm() {
  const dispatch = useDispatch();

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDescription(event.target.value));
  }

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
          id="description"
          name="description"
          label="Describe your space"
          fullWidth
          multiline
          rows={5}
          onChange={handleDescriptionChange}
        />
      </Box>
    </>
  );
}
