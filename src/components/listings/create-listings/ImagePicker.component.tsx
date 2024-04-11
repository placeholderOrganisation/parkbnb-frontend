import React from "react";
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
import { isDesktop } from "../../../utils/display-utils";
import { CustomImageProps } from "../../../types/create-listing-form.types";
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

export default function ImagePicker() {
  const [imageName, setImageName] = React.useState("");
  const [image, setImage] = React.useState("");
  const [uploadState, setUploadState] = React.useState("initial");

  const dispatch = useDispatch();

  // @ts-ignore
  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      // @ts-ignore
      reader.onloadend = function (e) {
        // @ts-ignore
        setImage(reader.result);
        setUploadState("uploaded");
        setImageName(file.name);
        dispatch(setImages({ file: reader.result, name: file.name}));
      };
    }
  };

  // @ts-ignore
  const handleResetClick = (event) => {
    // @ts-ignore
    setImage(null);
    setUploadState("initial");
    dispatch(removeImage(imageName))
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
