import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import ImagePicker from "./ImagePicker.component";
import { useDispatch, useSelector } from "react-redux";
import { setDescription } from "../../../redux/step-three-slice";
import { RootState } from "../../../redux/global-store";
import DescriptionField from "./DescriptionField.component";

export default function OptionalDetailsForm() {
  const dispatch = useDispatch();
  const {
    description: descriptionInRedux,
    images: imagesInRedux,
  } = useSelector((state: RootState) => state.stepThreeForm);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setDescription(event.target.value));
  };

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
            <ImagePicker imagesInRedux={imagesInRedux} index={0} />
          </Grid>
          <Grid item xs={6}>
            <ImagePicker imagesInRedux={imagesInRedux} index={1} />
          </Grid>
        </Grid>
      </Box>
      {/* Description TextBox */}
      <Box
        sx={{
          pt: 2.5,
        }}
      >
        <DescriptionField
          descriptionInRedux={descriptionInRedux}
          handleDescriptionChange={handleDescriptionChange}
        />
      </Box>
    </>
  );
}
