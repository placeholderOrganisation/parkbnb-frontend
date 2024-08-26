import Typography from "@mui/material/Typography";
import { Box, Grid, Stack } from "@mui/material";
import ImagePicker from "./image-picker/ImagePicker.component";
import { useDispatch, useSelector } from "react-redux";
import {
  setDescription,
  setStepThreeValidity,
} from "../../../redux/step-three-slice";
import { RootState } from "../../../redux/global-store";
import DescriptionField from "./DescriptionField.component";
import { callAnalytics } from "../../../utils/amplitude-utils";
import { useEffect } from "react";

export default function OptionalDetailsForm() {
  const dispatch = useDispatch();
  const {
    description: descriptionInRedux,
    images: imagesInRedux,
  } = useSelector((state: RootState) => state.stepThreeForm);

  const updateStepThreeValidity = () => {
    dispatch(setStepThreeValidity());
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setDescription(event.target.value));
    updateStepThreeValidity();
  };

  useEffect(() => {
    callAnalytics("images_and_description_section_viewed");
  }, []);

  return (
    <>
      {/* Image Picker Box */}
      <Box>
        <Typography variant="h6" sx={{ pb: 2 }}>
          Add Images
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
      <Stack
        sx={{
          pt: 5,
        }}
        spacing={2}
      >
        <Typography variant="h6" gutterBottom>
          Add Description
        </Typography>
        <DescriptionField
          descriptionInRedux={descriptionInRedux}
          handleDescriptionChange={handleDescriptionChange}
        />
      </Stack>
    </>
  );
}
