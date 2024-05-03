import { useState } from "react";
import { Grid, Box } from "@mui/material";

import {
  handleUpload,
  HandleUploadToS3Response,
} from "../../../../utils/s3-utils";
import { useDispatch } from "react-redux";
import { removeImage, setImages } from "../../../../redux/step-three-slice";
import ImagePickerCustomImageContainer from "./image-picker-custom-image.container";
import ImagePickerInitialState from "./image-picker-initial-state.component";
import SnackBar from "../../../custom-mui/snackbars/snackbar";
import Loading from "../../../custom-mui/loading.component";

interface ImagePickerProps {
  imagesInRedux: string[];
  index: number;
}

interface ImageUploadState {
  initial: "initial";
  uploading: "uploading";
  uploaded: "uploaded";
}

export default function ImagePicker(props: ImagePickerProps) {
  const { imagesInRedux, index } = props;

  const [isImageUploadFailed, setIsImageUploadFailed] = useState(false);
  const [image, setImage] = useState(
    imagesInRedux.length > index ? imagesInRedux[index] : ""
  );
  const [uploadState, setUploadState] = useState(
    imagesInRedux.length > index ? "uploaded" : "initial"
  );

  const dispatch = useDispatch();

  // @ts-ignore
  const handleUploadClick = async (event) => {
    var file = event.target.files[0];
    if (file) {
      setUploadState("uploading");
      const uploadedFileReq: HandleUploadToS3Response = await handleUpload(
        file
      );
      if (uploadedFileReq.success) {
        setImage(uploadedFileReq.location!);
        dispatch(setImages(uploadedFileReq.location));
        setUploadState("uploaded");
      } else {
        setUploadState("initial");
        setIsImageUploadFailed(true);
      }
    }
  };

  // @ts-ignore
  const handleResetImage = (event) => {
    // @ts-ignore
    dispatch(removeImage(image));
    setImage("");
    setUploadState("initial");
    setIsImageUploadFailed(false);
  };

  const getImagePickerComponent = (step: string) => {
    switch (step as keyof ImageUploadState) {
      case "initial":
        return (
          <ImagePickerInitialState handleUploadClick={handleUploadClick} />
        );
      case "uploaded":
        return (
          <ImagePickerCustomImageContainer
            image={image}
            handleResetClick={handleResetImage}
          />
        );
      case "uploading":
        return (
          <Box sx={{ my: 2 }}>
            <Loading height={100} width={100} />
          </Box>
        );
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {getImagePickerComponent(uploadState)}
          </Grid>
        </Grid>
      </Box>
      <SnackBar
        open={isImageUploadFailed}
        message="Image upload failed. Please try again."
        severity="error"
        handleClose={() => setIsImageUploadFailed(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      />
    </>
  );
}
