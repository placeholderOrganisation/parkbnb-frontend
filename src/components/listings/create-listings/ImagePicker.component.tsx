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

import { isDesktop } from "../../../utils/display-utils";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { CustomImageProps } from "../../../types/create-listing-form.types";
import { handleUpload, HandleUploadToS3Response } from "../../../utils/s3-utils";
import { useDispatch } from "react-redux";
import { removeImage, setImages } from "../../../redux/step-three-slice";

const CustomImage = (props: CustomImageProps) => {
  const { src } = props;
  const isDesktopView = isDesktop();
  const _width = isDesktopView ? "250px" : "100px";
  const _height = isDesktopView ? "250px" : "100px";

  return (
    <img
      style={{
        width: _width,
        height: _height,
      }}
      src={src}
      alt="uploaded image"
    />
  );
};

interface ImagePickerProps {
  imagesInRedux: string[];
  index: number;
}

export default function ImagePicker(props: ImagePickerProps) {
  const { imagesInRedux, index } = props;
  const [image, setImage] = useState(imagesInRedux.length > index ? imagesInRedux[index] : "");
  const [uploadState, setUploadState] = useState(imagesInRedux.length > index ? "uploaded" : "initial");

  const dispatch = useDispatch();

  // @ts-ignore
  const handleUploadClick = async (event) => {
    var file = event.target.files[0];
    if (file) {
      const uploadedFileReq: HandleUploadToS3Response = await handleUpload(file);
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
                  onClick={handleResetClick}
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
