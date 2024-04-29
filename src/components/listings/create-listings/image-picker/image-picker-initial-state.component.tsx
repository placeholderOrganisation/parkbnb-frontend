import { Box, Card, CardContent, Fab, Input } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

interface ImagePickerInitialStateProps {
  handleUploadClick: (event: any) => void;
}

const ImagePickerInitialState = (props: ImagePickerInitialStateProps) => {
  const { handleUploadClick } = props;
  return (
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
  );
};

export default ImagePickerInitialState;
