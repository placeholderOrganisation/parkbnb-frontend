import { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Fab,
  Grid,
  Box,
  Input,
  Button,
  Stack,
} from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  handleUpload,
  HandleUploadToS3Response,
} from "../../../utils/s3-utils";
import { useDispatch } from "react-redux";
import { removeImage, setImages } from "../../../redux/step-three-slice";
import { CustomImage } from "./image-picker-custom-image.component";

interface ImagePickerProps {
  imagesInRedux: string[];
  index: number;
}

export default function ImagePicker(props: ImagePickerProps) {
  const { imagesInRedux, index } = props;
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
      const uploadedFileReq: HandleUploadToS3Response = await handleUpload(
        file
      );
      if (uploadedFileReq.success) {
        setImage(uploadedFileReq.location!);
        dispatch(setImages(uploadedFileReq.location));
        setUploadState("uploaded");
      }
    }
  };

  // @ts-ignore
  const handleResetClick = (event) => {
    // @ts-ignore
    setImage("");
    setUploadState("initial");
    dispatch(removeImage(image));
  };

  return (
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
          {uploadState === "initial" ? (
            <Card>
              <CardContent
                sx={{
                  paddingBottom: "14px !important",
                  margin: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Input
                    sx={{
                      display: "none",
                    }}
                    inputProps={{
                      accept: "image/jpeg,image/png,image/tiff,image/webp",
                      id: "contained-button-file",
                      name: "logo",
                      type: "file",
                    }}
                    id="contained-button-file"
                    name="logo"
                    type="file"
                    onChange={handleUploadClick}
                  />
                  <label
                    htmlFor="contained-button-file"
                    style={{
                      display: "block",
                    }}
                  >
                    <Fab
                      component="span"
                      sx={{
                        m: "10px",
                      }}
                    >
                      <AddPhotoAlternateIcon />
                    </Fab>
                  </label>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Stack spacing={2}>
              <Card>
                <CardActionArea
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CustomImage src={image} />
                </CardActionArea>
              </Card>
              <Button
                onClick={handleResetClick}
                variant="contained"
                color="primary"
              >
                Reset image
              </Button>
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
