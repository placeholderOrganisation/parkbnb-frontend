import { Button, Card, CardActionArea, Stack } from "@mui/material";
import { CustomImage } from "./image-picker-custom-image.component";

interface ImagePickerCustomImageContainerProps {
  image: string | null;
  handleResetClick: (event: any) => void;
}

const ImagePickerCustomImageContainer = (
  props: ImagePickerCustomImageContainerProps
) => {
  const { image, handleResetClick } = props;
  return (
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
      <Button onClick={handleResetClick} variant="contained" color="primary">
        Reset image
      </Button>
    </Stack>
  );
};

export default ImagePickerCustomImageContainer;
